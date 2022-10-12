namespace habitus.api.Models;

public class Entry: IHasId
{
    public int Id { get; init; }
    public int HabitId { get; init; }
    public DateTime Date { get; init; }
}