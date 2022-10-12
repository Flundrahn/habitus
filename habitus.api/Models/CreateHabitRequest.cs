using System.ComponentModel.DataAnnotations;

namespace habitus.api.Models;

public class CreateHabitRequest
{
    [Required]
    public string Title { get; init; } = null!;
    [Required]
    public int Goal { get; init; }
    [Required]
    // TODO Could create a random color generator here and remove required
    public string Color { get; init; } = null!;
    public string? Description { get; init; }
}