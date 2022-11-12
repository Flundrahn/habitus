namespace habitus.api.Models;

public class Entry : IHabitusResource
{
    public int Id { get; init; }
    public string UserId { get; set; } = null!;
    public int HabitId { get; init; }
    public DateTime Date { get; init; }
}