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
        private readonly HabitusDbContext _context;

        public HabitsController(HabitusDbContext context)
        {
            _context = context;
        }

        // GET: api/Habits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Habit>>> GetHabit()
        {
            if (_context.Habits == null)
            {
                return NotFound();
            }
            return await _context.Habits.Include(h => h.Entries).ToListAsync();
        }

        // GET: api/Habits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Habit>> GetHabit(int id)
        {
            if (_context.Habits == null)
            {
                return NotFound();
            }
            var habit = await _context.Habits.FindAsync(id);

            if (habit == null)
            {
                return NotFound();
            }

            return habit;
        }

        // PUT: api/Habits/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHabit(int id, Habit habit)
        {
            if (id != habit.Id)
            {
                return BadRequest();
            }

            _context.Entry(habit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HabitExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Habits
        [HttpPost]
        public async Task<ActionResult<Habit>> PostHabit(Habit habit)
        {
            if (_context.Habits == null)
            {
                return Problem("Entity set 'AppContext.Habit' is null.");
            }
            _context.Habits.Add(habit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHabit", new { id = habit.Id }, habit);
        }

        // DELETE: api/Habits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHabit(int id)
        {
            if (_context.Habits == null)
            {
                return NotFound();
            }
            var habit = await _context.Habits.FindAsync(id);
            if (habit == null)
            {
                return NotFound();
            }

            _context.Habits.Remove(habit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HabitExists(int id)
        {
            return (_context.Habits?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
