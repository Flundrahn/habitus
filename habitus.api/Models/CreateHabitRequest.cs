using System.ComponentModel.DataAnnotations;

namespace habitus.api.Models;

public class CreateHabitRequest
{
    // TODO Examine if the required attribute is doing its job. Earlier seems like it was not.
    [Required]
    public string Title { get; init; } = null!;
    [Required]
    public int Goal { get; init; }
    [Required]
    // TODO Could create a random color generator here and remove required
    public string Color { get; init; } = null!;
    public string? Description { get; init; }
}