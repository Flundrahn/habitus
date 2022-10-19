using habitus.api.Models;

namespace habitus.api.Data;

internal static class SeedData
{
    internal static Habit[] Habits()
    {
        var id = 1;

        return new Habit[]
        {
            new Habit
            {
                Id = id++,
                Title = "Read",
                Goal = 3,
                Color = "#32a852",
                Description = "Read a book",
            },
            new Habit
            {
                Id = id++,
                Title = "Exercise",
                Goal = 5,
                Color = "#2b26b5",
                Description = "For atleast 15 minutes",
            },
            new Habit
            {
                Id = id++,
                Title = "Meditate",
                Goal = 2,
                Color = "#701933",
                Description = "For atleast 10 minutes",
            },
        };
    }

    internal static Entry[] Entries()
    {
        var id = 1;

        return new Entry[] {
            new Entry { Id = id++, HabitId = 1, Date = new DateTime(2022, 10, 11) },
            new Entry { Id = id++, HabitId = 1, Date = new DateTime(2022, 10, 12) },
            new Entry { Id = id++, HabitId = 1, Date = new DateTime(2022, 10, 13) },
            new Entry { Id = id++, HabitId = 2, Date = new DateTime(2022, 10, 11) },
            new Entry { Id = id++, HabitId = 2, Date = new DateTime(2022, 10, 12) },
            new Entry { Id = id++, HabitId = 2, Date = new DateTime(2022, 10, 14) },
            new Entry { Id = id++, HabitId = 2, Date = new DateTime(2022, 10, 15) },
        };
    }
}