using System.ComponentModel.DataAnnotations;
using habitus.api.Auth;

namespace habitus.api.Models;

public class CreateHabitRequest : IHasUserId
{
    // TODO Examine if the required attribute is doing its job. Earlier seems like it was not.
    [Required]
    public string UserId { get; init; } = null!;
    [Required]
    public string Title { get; init; } = null!;
    [Required]
    public int Goal { get; init; }
    [Required]
    public string Color { get; init; } = null!;
    public string? Description { get; init; }
}