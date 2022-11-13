using habitus.api.Data;
using habitus.api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace habitus.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HabitsController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IAuthorizationService _authorization;

        public HabitsController(IRepositoryManager repository, IAuthorizationService authorizationService)
        {
            _repository = repository;
            _authorization = authorizationService;

        }

        // GET: api/Habits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HabitResponse>>> Get()
        {
            string userId = GetUserId();
            try
            {
                IEnumerable<HabitResponse> habits = await _repository.Habit.FindAllHabits(userId);

                if (habits == null) return NotFound();

                var authorizationResult = await _authorization.AuthorizeAsync(User, habits.First(), "SameUser");

                if (authorizationResult.Succeeded) return Ok(habits);
                else if (User.Identity!.IsAuthenticated) return new ForbidResult();
                else return new ChallengeResult();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<HabitResponse>>> Get(int id)
        {
            try
            {
                var habit = await _repository.Habit.Find(id);

                if (habit == null) return NotFound();

                var authorizationResult = await _authorization.AuthorizeAsync(User, habit, "SameUser");

                if (authorizationResult.Succeeded) return Ok(habit);
                else if (User.Identity!.IsAuthenticated) return new ForbidResult();
                else return new ChallengeResult();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        // TODO look up what is the REST way of naming filtered endpoints
        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<HabitResponse>>> GetFiltered([FromQuery] HabitEntriesFilter filter)
        {
            if (filter.EndDate is null) filter.EndDate = filter.StartDate;
            if (filter.StartDate > filter.EndDate) return BadRequest("Start date must be before end date");

            string userId = GetUserId();

            try
            {
                var habits = await _repository.Habit.FindAllAndFilterEntriesByDate(filter.StartDate, filter.EndDate.Value, userId);

                if (habits == null) return NotFound();

                var authorizationResult = await _authorization.AuthorizeAsync(User, habits.First(), "SameUser");

                if (!authorizationResult.Succeeded && User.Identity!.IsAuthenticated) return new ForbidResult();
                else if (!authorizationResult.Succeeded) return new ChallengeResult();

                return Ok(habits);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        // POST: api/Habits
        [HttpPost]
        public async Task<IActionResult> Post(CreateHabitRequest request)
        {
            try
            {
                var authorizationResult = await _authorization.AuthorizeAsync(User, request, "SameUser");

                if (!authorizationResult.Succeeded && User.Identity!.IsAuthenticated) return new ForbidResult();
                else if (!authorizationResult.Succeeded) return new ChallengeResult();

                int id = await _repository.Habit.CreateHabit(request);

                switch (id)
                {
                    case 0:
                        return Problem("Failed to create habit");
                    case -1:
                        return Problem($"Table {nameof(HabitusDbContext.Habits)} is null.");
                    default:
                        return CreatedAtAction(nameof(Get), new { id = id });
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var habit = await _repository.Habit.Find(id);

                if (habit == null) return NotFound();

                var authorizationResult = await _authorization.AuthorizeAsync(User, habit, "SameUser");

                if (!authorizationResult.Succeeded && User.Identity!.IsAuthenticated) return new ForbidResult();
                else if (!authorizationResult.Succeeded) return new ChallengeResult();

                bool response = await _repository.Habit.DeleteHabit(id);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }

            return NoContent();
        }

        // PUT: api/Habits/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UpdateHabitRequest request)
        {
            if (id != request.Id) return BadRequest("Id in request body does not match id in route.");

            try
            {
                var habit = await _repository.Habit.Find(id);

                if (habit == null) return NotFound();

                var authorizationResult = await _authorization.AuthorizeAsync(User, habit, "SameUser");

                if (!authorizationResult.Succeeded && User.Identity!.IsAuthenticated) return new ForbidResult();
                else if (!authorizationResult.Succeeded) return new ChallengeResult();

                bool response = await _repository.Habit.UpdateHabit(request);

                if (!response) return NotFound();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_repository.Habit.Find(id) == null)
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }

            return NoContent();
        }

        private string GetUserId()
        {
            string? userId = HttpContext.User.Claims.First(c => c.Type == "userId")?.Value;
            if (userId is null) throw new Exception("UserId is null");
            return userId;
        }
    }
}
