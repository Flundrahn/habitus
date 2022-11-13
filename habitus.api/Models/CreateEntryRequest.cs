using Microsoft.Build.Framework;

namespace habitus.api.Models;

public class CreateEntryRequest
{
    [Required]
    public string UserId { get; init; } = null!;
    [Required]
    public int HabitId { get; init; }
    [Required]
    public DateTime Date { get; init; }
}