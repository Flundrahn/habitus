using habitus.api.Data;
using habitus.api.Data.Interfaces;
using habitus.api.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace habitus.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EntriesController : HabitusControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IAuthorizationService _authorization;

        public EntriesController(IRepositoryManager repository, IAuthorizationService authorizationService)
        {
            _repository = repository;
            _authorization = authorizationService;
        }

        // GET: api/Entries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntryResponse>>> Get()
        {
            try
            {
                IEnumerable<EntryResponse> entries = await _repository.Entry.FindAllEntries(GetUserId());

                if (entries == null || !entries.Any()) return NotFound();

                var authorizationResult = await _authorization.AuthorizeAsync(User, entries.First(), "SameUser");

                if (!authorizationResult.Succeeded && User.Identity!.IsAuthenticated) return new ForbidResult();
                else if (!authorizationResult.Succeeded) return new ChallengeResult();


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

                if (entry == null) return NotFound();

                var authorizationResult = await _authorization.AuthorizeAsync(User, entry, "SameUser");

                if (!authorizationResult.Succeeded && User.Identity!.IsAuthenticated) return new ForbidResult();
                else if (!authorizationResult.Succeeded) return new ChallengeResult();

                return Ok(entry);
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
                var authorizationResult = await _authorization.AuthorizeAsync(User, request, "SameUser");

                if (!authorizationResult.Succeeded && User.Identity!.IsAuthenticated) return new ForbidResult();
                else if (!authorizationResult.Succeeded) return new ChallengeResult();

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
                var entry = await _repository.Entry.Find(id);

                var authorizationResult = await _authorization.AuthorizeAsync(User, entry, "SameUser");

                if (!authorizationResult.Succeeded && User.Identity!.IsAuthenticated) return new ForbidResult();
                else if (!authorizationResult.Succeeded) return new ChallengeResult();

                bool response = await _repository.Entry.DeleteEntry(id);

                if (!response) return NotFound();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }

            return NoContent();
        }
    }
}
