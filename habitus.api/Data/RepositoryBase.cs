using System.Linq.Expressions;
using AutoMapper;
using habitus.api.Data.Interfaces;
using habitus.api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace habitus.api.Data;

public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class, IHasId
{
    protected HabitusDbContext _context;
    protected IMapper _mapper;
    protected RepositoryBase(HabitusDbContext context, IMapper mapper)
    {
        _mapper = mapper;
        _context = context;
    }

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

    public bool TableExists() => (_context.Set<T>() != null);
    public bool EntityExists(int id) => (_context.Set<T>().Find(id) != null);
}