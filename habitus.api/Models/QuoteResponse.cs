namespace habitus.api.Models;

public class QuoteResponse
{
    public int Id { get; init; }
    public string QuoteText { get; init; } = null!;
    public string Philosopher { get; init; } = null!;
}