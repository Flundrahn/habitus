namespace habitus.api.Models;

public class HabitResponse : IHabitusResource
{
    public int Id { get; init; }
    public string UserId { get; init; } = null!;
    public string Title { get; init; } = null!;
    public int Goal { get; init; }
    public int Score { get; init; }
    public string Color { get; init; } = null!;
    public string? Description { get; init; }
    public ICollection<EntryResponse>? Entries { get; set; }
}