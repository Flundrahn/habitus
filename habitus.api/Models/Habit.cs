using habitus.api.Interfaces;

namespace habitus.api.Models;

public class Habit : IHasId, IHasUserId
{
    public int Id { get; init; }
    public string UserId { get; init; } = null!;
    public string Title { get; init; } = null!;
    public int Goal { get; init; }
    public string Color { get; init; } = null!;
    public string? Description { get; init; }
    public ICollection<Entry> Entries { get; init; }

    public Habit()
    {
        Entries = new List<Entry>();
    }
}