using System.ComponentModel.DataAnnotations;

public class HabitEntriesFilter
{
    [Required]
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}