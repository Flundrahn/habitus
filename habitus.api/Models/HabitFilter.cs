using System.ComponentModel.DataAnnotations;

public class HabitFilter
{
    [Required]
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}