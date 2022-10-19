using AutoMapper;
using habitus.api.Data;
using habitus.api.Models;
using Microsoft.AspNetCore.Mvc;

namespace habitus.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntriesController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public EntriesController(IRepositoryManager repository)
        {
            _repository = repository;
        }

        // GET: api/Entries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntryResponse>>> Get()
        {
            try
            {
                IEnumerable<EntryResponse> entries = await _repository.Entry.FindAllEntries();

                if (entries == null)
                {
                    return NotFound();
                }

                return Ok(entries);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        // GET: api/Entries/1
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<EntryResponse>>> Get(int id)
        {
            try
            {
                var entry = await _repository.Entry.Find(id);

                if (entry == null)
                {
                    return NotFound();
                }

                return Ok(_mapper.Map<EntryResponse>(entry));
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        // POST: api/Entries
        [HttpPost]
        public async Task<IActionResult> Post(CreateEntryRequest request)
        {
            try
            {
                int id = await _repository.Entry.CreateEntry(request);

                switch (id)
                {
                    case 0:
                        return Problem("Failed to create entry");
                    case -1:
                        return Problem($"Table {nameof(HabitusDbContext.Entries)} is null.");
                    case -2:
                        return BadRequest($"Entry already exists for habit {request.HabitId} on {request.Date.Date}.");
                    case -3:
                        return BadRequest($"Habit {request.HabitId} does not exist.");
                    default:
                        return CreatedAtAction(nameof(Get), new { id = id });
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        // DELETE: api/Entries/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool response = await _repository.Entry.DeleteEntry(id);

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
    }
}
