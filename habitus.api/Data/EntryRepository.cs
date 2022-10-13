using habitus.api.Models;
using Microsoft.EntityFrameworkCore;

namespace habitus.api.Data
{
    public class EntryRepository : RepositoryBase<Entry>, IEntryRepository
    {
        public EntryRepository(HabitusDbContext context)
            : base(context)
        {
        }

        public async Task<IEnumerable<Entry>> FindAllEntries(bool trackChanges)
        {
            return await FindAll(trackChanges).ToArrayAsync();
        }
    }
}