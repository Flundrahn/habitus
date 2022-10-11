public class Habit
{
    public int Id { get; init; }
    public string Title { get; init; } = null!;
    public int Goal { get; init; }
    public string Color { get; init; } = null!;
    public ICollection<Entry>? Entries { get; set; }
}