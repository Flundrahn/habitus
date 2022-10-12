using System.ComponentModel.DataAnnotations;

namespace habitus.api.Models;

public class UpdateHabitRequest
{
    [Required]
    public int Id { get; init; }
    [Required]
    public string Title { get; init; } = null!;
    [Required]
    public int Goal { get; init; }
    [Required]
    public string Color { get; init; } = null!;
    public string? Description { get; init; }
}