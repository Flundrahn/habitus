using AutoMapper;
using habitus.api.Models;
using Microsoft.EntityFrameworkCore;

namespace habitus.api.Data
{
    public class EntryRepository : RepositoryBase<Entry>, IEntryRepository
    {
        public EntryRepository(HabitusDbContext context, IMapper mapper)
            : base(context, mapper)
        {
        }

        public async Task<EntryResponse> Find(int id)
        {
            var entry = await FindById(id, false);

            return _mapper.Map<EntryResponse>(entry);
        }

        public async Task<IEnumerable<EntryResponse>> FindAllEntries()
        {
            var entries = await FindAll(false).ToArrayAsync();

            return _mapper.Map<IEnumerable<EntryResponse>>(entries);
        }

        public async Task<int> CreateEntry(CreateEntryRequest request)
        {
            bool habitExists = _context.Habits.Any(h => h.Id == request.HabitId);
            if (!habitExists) return -3;

            bool entryDateExistsForHabit = FindByCondition(e => e.HabitId == request.HabitId, false)
                .Any(e => e.Date.Date == request.Date.Date);
            if (entryDateExistsForHabit) return -2;

            int id = await Create(_mapper.Map<Entry>(request));

            return id;
        }

        public async Task<bool> DeleteEntry(int id)
        {
            bool result = await Delete(id, false);

            return result;
        }
    }
}