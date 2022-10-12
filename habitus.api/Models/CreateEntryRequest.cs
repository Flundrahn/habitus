using Microsoft.Build.Framework;

namespace habitus.api.Models;

public class CreateEntryRequest
{
    [Required]
    public int HabitId { get; init; }
    [Required]
    public DateTime Date { get; init; }
}