namespace habitus.api.Data;

public interface IRepositoryManager
{
    IHabitRepository Habit { get; }
    IEntryRepository Entry { get; }
    void Save();
}