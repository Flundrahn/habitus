using System.Linq.Expressions;
using AutoMapper;
using habitus.api.Models;
using Microsoft.EntityFrameworkCore;

namespace habitus.api.Data;

public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class, IHasId
{
    protected HabitusDbContext _context;
    protected IMapper _mapper;
    public RepositoryBase(HabitusDbContext context, IMapper mapper)
    {
        _mapper = mapper;
        _context = context;
    }

    // NOTE Do not know how trackChanges works.
    // This is a comment from Ultimate ASP.NET:
    // " Moreover, we can see the trackChanges parameter. We are going to use
    // it to improve our read-only query performance. When it’s set to false, we
    // attach the AsNoTracking method to our query to inform EF Core that it
    // doesn’t need to track changes for the required entities. This greatly
    // improves the speed of a query. "
    public IQueryable<T> FindAll(bool trackChanges)
    {
        return trackChanges ?
            _context.Set<T>()
            : _context.Set<T>().AsNoTracking();
    }

    public async Task<T?> FindById(int id, bool trackChanges)
    {
        return await FindByCondition(e => e.Id.Equals(id), trackChanges)
            .SingleOrDefaultAsync();
    }

    public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression, bool trackChanges)
    {
        return trackChanges ?
            _context.Set<T>().Where(expression)
            : _context.Set<T>().Where(expression).AsNoTracking();
    }


    // NOTE "The Create and Delete method signatures are left synchronous. That’s
    // because, in these methods, we are not making any changes in the
    // database. All we're doing is changing the state of the entity to Added and
    // Deleted"
    public async Task<int> Create(T entity)
    {
        if (!TableExists()) return -1;

        await _context.Set<T>().AddAsync(entity);
        await _context.SaveChangesAsync();

        return entity.Id;
    }

    public async Task<bool> Update(T entity)
    {
        if (!TableExists()) return false;

        var currentEntity = await FindById(entity.Id, false);

        if (currentEntity == null) return false;

        _context.Set<T>().Update(entity);
        await _context.SaveChangesAsync();

        return true;
    }
    public async Task<bool> Delete(int id, bool trackChanges)
    {
        if (!TableExists()) return false;

        var entity = await FindById(id, false);

        if (entity == null) return false;

        _context.Set<T>().Remove(entity);
        await _context.SaveChangesAsync();

        return true;
    }

    // TODO Use these to help error handling later
    public bool TableExists() => (_context.Set<T>() != null);
    public bool EntityExists(int id) => (_context.Set<T>().Find(id) != null);
}

// NOTE We don't save the changes in the database here, but will instead do it in a
// repository manager, it will also handle combining the multiple repos for mixed entity type responses