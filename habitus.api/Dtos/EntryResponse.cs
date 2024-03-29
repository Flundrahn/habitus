using habitus.api.Interfaces;

namespace habitus.api.Dtos;

public class EntryResponse : IHasId, IHasUserId
{
    public int Id { get; init; }
    public string UserId { get; init; } = null!;
    public int HabitId { get; init; }
    public DateTime Date { get; init; }
    public bool IsCompleted { get; init; } = true;
}