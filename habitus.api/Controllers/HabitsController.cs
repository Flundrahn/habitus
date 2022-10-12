using AutoMapper;
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
        private readonly IMapper _mapper;

        public HabitsController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // GET: api/Habits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Habit>>> Get()
        {
            try
            {
                var habits = await _repository.Habit.FindAll(false);

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
        public async Task<ActionResult<IEnumerable<Habit>>> Get(int id)
        {
            try
            {
                var habit = await _repository.Habit.FindById(id, false);

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

        // POST: api/Habits
        [HttpPost]
        public ActionResult<Habit> Post(CreateHabitRequest request)
        {
            try
            {
                int id = _repository.Habit.Create(_mapper.Map<Habit>(request));

                if (id == -1)
                {
                    return Problem($"Table {nameof(HabitusDbContext.Habits)} is null.");
                }

                return CreatedAtAction(nameof(Get), new { id = id });
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Habit>>> Delete(int id)
        {
            try
            {
                bool response = await _repository.Habit.Delete(id);

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
                bool response = await _repository.Habit.Update(_mapper.Map<Habit>(request));

                if (!response)
                {
                    return NotFound();
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_repository.Habit.FindById(id, false) == null)
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
