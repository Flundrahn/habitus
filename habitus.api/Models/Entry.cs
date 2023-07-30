using habitus.api.Interfaces;

namespace habitus.api.Models;

public class Entry : IHasId, IHasUserId
{
    public int Id { get; init; }
    public string UserId { get; init; } = null!;
    public int HabitId { get; init; }
    public DateTime Date { get; init; }
}