using AutoMapper;

namespace habitus.api.Data;

public class RepositoryManager : IRepositoryManager
{
    private HabitusDbContext _context;
    private IHabitRepository? _habitRepository;
    private IEntryRepository? _entryRepository;

    public RepositoryManager(HabitusDbContext context)
    {
        _context = context;
    }

    public IHabitRepository Habit
    {
        get
        {
            if (_habitRepository == null)
            {
                _habitRepository = new HabitRepository(_context);
            }

            return _habitRepository;
        }
    }

    public IEntryRepository Entry
    {
        get
        {
            if (_entryRepository == null)
            {
                _entryRepository = new EntryRepository(_context);
            }

            return _entryRepository;
        }
    }

    public void Save() => _context.SaveChanges();
}