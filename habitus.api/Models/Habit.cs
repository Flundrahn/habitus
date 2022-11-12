namespace habitus.api.Models;

public class Habit : IHabitusResource
{
    public int Id { get; init; }
    public string UserId { get; set; } = null!;
    public string Title { get; init; } = null!;
    public int Goal { get; init; }
    public string Color { get; init; } = null!;
    public string? Description { get; init; }
    public ICollection<Entry>? Entries { get; set; }
}