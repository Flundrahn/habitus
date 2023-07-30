using System.ComponentModel.DataAnnotations;

namespace habitus.api.Dtos;

public class HabitEntriesFilter
{
    [Required]
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}