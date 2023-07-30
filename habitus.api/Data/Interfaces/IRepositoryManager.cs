namespace habitus.api.Data.Interfaces;

public interface IRepositoryManager
{
    IHabitRepository Habit { get; }
    IEntryRepository Entry { get; }
    IQuoteRepository Quote { get; }
}