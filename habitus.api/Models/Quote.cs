namespace habitus.api.Models;

public class Quote
{
    public int Id { get; set; }
    public string QuoteText { get; init; } = null!;
    public string Philosopher { get; init; } = null!;
}