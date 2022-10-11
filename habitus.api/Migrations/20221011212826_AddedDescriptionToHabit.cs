using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace habitus.api.Migrations
{
    public partial class AddedDescriptionToHabit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Habit",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Habit");
        }
    }
}
