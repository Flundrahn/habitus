using habitus.api.Interfaces;
using Microsoft.Build.Framework;

namespace habitus.api.Dtos;

public class CreateEntryRequest : IHasUserId
{
    [Required]
    public string UserId { get; init; } = null!;
    [Required]
    public int HabitId { get; init; }
    [Required]
    public DateTime Date { get; init; }
}