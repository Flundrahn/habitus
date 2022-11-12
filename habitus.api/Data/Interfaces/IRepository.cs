using System.Linq.Expressions;
using habitus.api.Models;

namespace habitus.api.Data;

// TODO Reevaluate naming and structure of this file with interfaces, after understand function
public interface IRepositoryBase<T>
{
    IQueryable<T> FindAll(bool trackChanges);
    Task<T?> FindById(int id, bool trackChanges);
    IQueryable<T> FindByCondition(
        Expression<Func<T, bool>> expression,
        bool trackChanges);
    Task<int> Create(T entity, string userId);
    Task<bool> Update(T entity);
    Task<bool> Delete(int id, bool trackChanges);
}

public interface IHabitRepository
{
    Task<HabitResponse> Find(int id);
    Task<IEnumerable<HabitResponse>> FindAllHabits(string userId);
    Task<IEnumerable<HabitResponse>> FindAllAndFilterEntriesByDate(DateTime startDate, DateTime endDate, string userId);
    Task<int> CreateHabit(CreateHabitRequest habitRequest,string userId);
    Task<bool> DeleteHabit(int id);
    Task<bool> UpdateHabit(UpdateHabitRequest request);
}

public interface IEntryRepository
{
    Task<EntryResponse> Find(int id);
    Task<IEnumerable<EntryResponse>> FindAllEntries();
    Task<int> CreateEntry(CreateEntryRequest request);
    Task<bool> DeleteEntry(int id);
}

public interface IQuoteRepository
{
    QuoteResponse? GetRandomQuote();
    // Task<QuoteResponse?> GetRandomQuote();
}
