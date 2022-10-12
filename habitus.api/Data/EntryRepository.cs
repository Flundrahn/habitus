using habitus.api.Models;

namespace habitus.api.Data
{
    public class EntryRepository : RepositoryBase<Entry>, IEntryRepository
    {
        public EntryRepository(HabitusDbContext context)
            : base(context)
        {
        }
    }
}