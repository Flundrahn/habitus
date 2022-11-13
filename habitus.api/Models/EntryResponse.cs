namespace habitus.api.Models;

public class EntryResponse : IHabitusResource
{
    public int Id { get; init; }
    public string UserId { get; init; } = null!;
    public int HabitId { get; init; }
    public DateTime Date { get; init; }
    public bool IsCompleted { get; init; } = true;
}