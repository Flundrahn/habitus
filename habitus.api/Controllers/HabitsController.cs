using habitus.api.Data;
using habitus.api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace habitus.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HabitsController : ControllerBase
    {
        private readonly IRepositoryManager _repository;

        public HabitsController(IRepositoryManager repository)
        {
            _repository = repository;
        }

        // GET: api/Habits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HabitResponse>>> Get()
        {
            try
            {
                IEnumerable<HabitResponse> habits = await _repository.Habit.FindAllHabits();

                if (habits == null)
                {
                    return NotFound();
                }

                return Ok(habits);
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

                if (habit == null)
                {
                    return NotFound();
                }

                return Ok(habit);
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

            try
            {
                var habits = await _repository.Habit.FindAllAndFilterEntriesByDate(filter.StartDate, filter.EndDate.Value);

                if (habits == null)
                {
                    return NotFound();
                }

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
                bool response = await _repository.Habit.DeleteHabit(id);

                if (!response)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        // PUT: api/Habits/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UpdateHabitRequest request)
        {
            if (id != request.Id) return BadRequest("Id in request body does not match id in route.");

            try
            {
                bool response = await _repository.Habit.UpdateHabit(request);

                if (!response)
                {
                    return NotFound();
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_repository.Habit.Find(id) == null)
                {
                    return NotFound();
                }
            }
            // NOTE I have not investigated if this ais a proper way to chain exception catching
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }

            return NoContent();
        }
    }
}
