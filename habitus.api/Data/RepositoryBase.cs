using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace habitus.api.Data;

public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
{
    private HabitusDbContext _context;
    public RepositoryBase(HabitusDbContext context)
    {
        _context = context;
    }

    // NOTE Do not know how trackChanges works.
    // This is a comment from Ultimate ASP.NET:
    // " Moreover, we can see the trackChanges parameter. We are going to use
    // it to improve our read-only query performance. When it’s set to false, we
    // attach the AsNoTracking method to our query to inform EF Core that it
    // doesn’t need to track changes for the required entities. This greatly
    // improves the speed of a query. "
    public IQueryable<T> FindAll(bool trackChanges) =>
        !trackChanges ?
            _context.Set<T>().AsNoTracking()
            : _context.Set<T>();
            
    public IQueryable<T> FindByCondition(
        Expression<Func<T, bool>> expression,
        bool trackChanges) =>
            !trackChanges ?
                _context.Set<T>().Where(expression).AsNoTracking()
                : _context.Set<T>().Where(expression);
    public void Create(T entity) => _context.Set<T>().Add(entity);
    public void Update(T entity) => _context.Set<T>().Update(entity);
    public void Delete(T entity) => _context.Set<T>().Remove(entity);
}

// NOTE We don't save the changes in the database here, but will instead do it in a
// repository manager, it will also handle combining the multiple repos for mixed entity type responses