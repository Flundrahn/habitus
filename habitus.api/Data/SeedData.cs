using Newtonsoft.Json;
using habitus.api.Models;

namespace habitus.api.Data;

internal static class SeedData
{
    internal static Habit[] Habits()
    {
        var id = 1;
        var userId = "1";

        return new Habit[]
        {
            new Habit
            {
                Id = id++,
                UserId = userId,
                Title = "Read",
                Goal = 3,
                Color = "#32a852",
                Description = "Read a book",
            },
            new Habit
            {
                Id = id++,
                UserId = userId,
                Title = "Exercise",
                Goal = 5,
                Color = "#2b26b5",
                Description = "For atleast 15 minutes",
            },
            new Habit
            {
                Id = id++,
                UserId = userId,
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
        var userId = "1";

        return new Entry[] {
            new Entry { Id = id++, UserId = userId, HabitId = 1, Date = new DateTime(2022, 10, 11) },
            new Entry { Id = id++, UserId = userId, HabitId = 1, Date = new DateTime(2022, 10, 12) },
            new Entry { Id = id++, UserId = userId, HabitId = 1, Date = new DateTime(2022, 10, 13) },
            new Entry { Id = id++, UserId = userId, HabitId = 2, Date = new DateTime(2022, 10, 11) },
            new Entry { Id = id++, UserId = userId, HabitId = 2, Date = new DateTime(2022, 10, 12) },
            new Entry { Id = id++, UserId = userId, HabitId = 2, Date = new DateTime(2022, 10, 14) },
            new Entry { Id = id++, UserId = userId, HabitId = 2, Date = new DateTime(2022, 10, 15) },
        };
    }

    internal static Quote[]? Quotes()
    {
        var fileName = "Database/stoic-quotes.json";
        string filePath = Path.Combine(Directory.GetCurrentDirectory(), fileName);
        using FileStream openStream = File.OpenRead(filePath);
        using var streamReader = new StreamReader(openStream);
        using var jsonReader = new JsonTextReader(streamReader);
        var serializer = new JsonSerializer();

        return serializer.Deserialize<Quote[]>(jsonReader);
    }
}