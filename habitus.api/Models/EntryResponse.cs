namespace habitus.api.Models;

public class EntryResponse
{
    public int Id { get; init; }
    public int HabitId { get; init; }
    public DateTime Date { get; init; }
    public bool IsCompleted { get; init; } = true;
}