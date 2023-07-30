using System.ComponentModel.DataAnnotations;
using habitus.api.Interfaces;

namespace habitus.api.Dtos;

public class CreateHabitRequest : IHasUserId
{
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