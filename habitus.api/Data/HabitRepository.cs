using habitus.api.Models;
using Microsoft.EntityFrameworkCore;

namespace habitus.api.Data;

public class HabitRepository : RepositoryBase<Habit>, IHabitRepository
{
    public HabitRepository(HabitusDbContext context)
        : base(context)
    {
    }

    public async Task<IEnumerable<Habit>> FindAllHabits(bool trackChanges)
    {
        return await FindAll(trackChanges).ToArrayAsync();
    }

    public async Task<Habit[]> FindAllAndFilterEntriesByDate(DateTime startDate, DateTime endDate)
    {
        // NOTE Should I do anything about the null warning here?
        var filteredHabits = FindAll(false)
            .Include(h => h.Entries
                .Where(entry =>
                entry.Date >= startDate
                && entry.Date <= endDate)
                .OrderBy(e => e.Date))
            .ToArrayAsync();
            
        return await filteredHabits;
    }
}