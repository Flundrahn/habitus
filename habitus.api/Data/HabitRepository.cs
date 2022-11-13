using AutoMapper;
using Microsoft.EntityFrameworkCore;
using habitus.api.Models;
using habitus.api.Extensions;

namespace habitus.api.Data;

public class HabitRepository : RepositoryBase<Habit>, IHabitRepository
{
    public HabitRepository(HabitusDbContext context, IMapper mapper)
        : base(context, mapper)
    {
    }

    public async Task<HabitResponse> Find(int id)
    {
        var habit = await FindById(id, false);

        return _mapper.Map<HabitResponse>(habit);
    }

    public async Task<IEnumerable<HabitResponse>> FindAllHabits(string userId)
    {
        var habits = await FindByCondition(h => h.UserId == userId, false).ToArrayAsync();

        return _mapper.Map<IEnumerable<HabitResponse>>(habits);
    }

    public async Task<IEnumerable<HabitResponse>> FindAllAndFilterEntriesByDate(
        DateTime startDate,
        DateTime endDate,
        string userId
    )
    {
        // NOTE Should I do anything about the null warning here?
        var filteredHabits = FindByCondition(h => h.UserId == userId, false)
            .Include(h => h.Entries
                .Where(entry =>
                    entry.Date >= startDate
                    &&
                    entry.Date <= endDate))
            .Select<Habit, HabitResponse>(h => _mapper.Map<HabitResponse>(h)
                .PopulateUncompletedEntries(startDate, endDate))
            .ToArrayAsync();

        return await filteredHabits;
    }

    public async Task<int> CreateHabit(CreateHabitRequest request)
    {
        int id = await Create(_mapper.Map<Habit>(request));

        return id;
    }

    public async Task<bool> DeleteHabit(int id)
    {
        bool result = await Delete(id, false);

        return result;
    }

    public async Task<bool> UpdateHabit(UpdateHabitRequest request)
    {
        bool result = await Update(_mapper.Map<Habit>(request));

        return result;
    }
}