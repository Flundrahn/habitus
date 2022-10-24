using AutoMapper;

namespace habitus.api.Data;

public class RepositoryManager : IRepositoryManager
{
    private HabitusDbContext _context;
    private IHabitRepository? _habitRepository;
    private IEntryRepository? _entryRepository;
    private IQuoteRepository? _quoteRepository;
    private IMapper _mapper;

    public RepositoryManager(HabitusDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public IHabitRepository Habit
    {
        get
        {
            if (_habitRepository == null)
            {
                _habitRepository = new HabitRepository(_context, _mapper);
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
                _entryRepository = new EntryRepository(_context, _mapper);
            }

            return _entryRepository;
        }
    }

    public IQuoteRepository Quote
    {
        get
        {
            if (_quoteRepository == null)
            {
                _quoteRepository = new QuoteRepository(_mapper);
            }

            return _quoteRepository;
        }
    }
}