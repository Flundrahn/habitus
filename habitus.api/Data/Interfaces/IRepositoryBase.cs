using System.Linq.Expressions;
using habitus.api.Models;

namespace habitus.api.Data;

// TODO Reevaluate naming and structure of this file with interfaces, after understand function
public interface IRepositoryBase<T>
{
    // TODO After finishing EntryController decide if remove trackChanges as argument and hardcode instead
    IQueryable<T> FindAll(bool trackChanges);
    Task<T?> FindById(int id, bool trackChanges);
    IQueryable<T> FindByCondition(
        Expression<Func<T, bool>> expression,
        bool trackChanges);
    int Create(T entity);
    Task<bool> Update(T entity);
    Task<bool> Delete(int id);
}

public interface IHabitRepository : IRepositoryBase<Habit>
{
    Task<IEnumerable<Habit>> FindAllHabits(bool trackChanges);
    Task<Habit[]> FindAllAndFilterEntriesByDate(DateTime startDate, DateTime endDate);
}

public interface IEntryRepository : IRepositoryBase<Entry>
{
    Task<IEnumerable<Entry>> FindAllEntries(bool trackChanges);
}
