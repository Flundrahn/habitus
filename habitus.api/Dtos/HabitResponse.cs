using habitus.api.Interfaces;

namespace habitus.api.Dtos;

public class HabitResponse : IHasId, IHasUserId
{
    public int Id { get; init; }
    public string UserId { get; init; } = null!;
    public string Title { get; init; } = null!;
    public int Goal { get; init; }
    public int Score { get; init; }
    public string Color { get; init; } = null!;
    public string? Description { get; init; }
    public ICollection<EntryResponse> Entries { get; set; }

    public HabitResponse()
    {
        Entries = new List<EntryResponse>();
    }
}