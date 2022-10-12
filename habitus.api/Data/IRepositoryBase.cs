using System.Linq.Expressions;

namespace habitus.api.Data;

// TODO Reevaluate naming and structure of this file with interfaces, after understand function
public interface IRepositoryBase<T>
{
    IQueryable<T> FindAll(bool trackChanges);
    IQueryable<T> FindByCondition(
        Expression<Func<T, bool>> expression,
        bool trackChanges);
    void Create(T entity);
    void Update(T entity);
    void Delete(T entity);
}

public interface IHabitRepository
{
}

public interface IEntryRepository
{
}
