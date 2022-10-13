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

        public EntriesController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // GET: api/Entries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Entry>>> Get()
        {
            try
            {
                var entries = await _repository.Entry.FindAllEntries(false);

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
        public async Task<ActionResult<IEnumerable<Entry>>> Get(int id)
        {
            try
            {
                var entry = await _repository.Entry.FindById(id, false);

                if (entry == null)
                {
                    return NotFound();
                }

                return Ok(entry);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        // POST: api/Entries
        [HttpPost]
        public ActionResult<Entry> Post(CreateEntryRequest request)
        {
            try
            {
                int id = _repository.Entry.Create(_mapper.Map<Entry>(request));

                if (id == -1)
                {
                    return Problem($"Table {nameof(HabitusDbContext.Entries)} is null.");
                }

                return CreatedAtAction(nameof(Get), new { id = id });
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        // DELETE: api/Entries/1
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Entry>>> Delete(int id)
        {
            try
            {
                bool response = await _repository.Entry.Delete(id);

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
