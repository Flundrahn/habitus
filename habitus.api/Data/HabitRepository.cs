using habitus.api.Models;

namespace habitus.api.Data;

public class HabitRepository : RepositoryBase<Habit>, IHabitRepository
{
    public HabitRepository(HabitusDbContext context)
        : base(context)
    {
    }
}