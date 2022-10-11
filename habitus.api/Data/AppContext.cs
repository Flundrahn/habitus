using habitus.api.Models;
using Microsoft.EntityFrameworkCore;

public class AppContext : DbContext
{
    public AppContext(DbContextOptions<AppContext> options)
        : base(options)
    {
    }

    public DbSet<Habit> Habits { get; set; } = default!;
    public DbSet<Entry> Entries { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Habit>().HasData(SeedData.Habits());
        modelBuilder.Entity<Entry>().HasData(SeedData.Entries());
    }
}
