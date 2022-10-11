using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace habitus.api.Migrations
{
    public partial class ChangeTableNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entry_Habit_HabitId",
                table: "Entry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Habit",
                table: "Habit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Entry",
                table: "Entry");

            migrationBuilder.RenameTable(
                name: "Habit",
                newName: "Habits");

            migrationBuilder.RenameTable(
                name: "Entry",
                newName: "Entries");

            migrationBuilder.RenameIndex(
                name: "IX_Entry_HabitId",
                table: "Entries",
                newName: "IX_Entries_HabitId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Habits",
                table: "Habits",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Entries",
                table: "Entries",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Habits",
                columns: new[] { "Id", "Color", "Description", "Goal", "Title" },
                values: new object[] { 1, "#32a852", "Read a book", 3, "Read" });

            migrationBuilder.InsertData(
                table: "Habits",
                columns: new[] { "Id", "Color", "Description", "Goal", "Title" },
                values: new object[] { 2, "#2b26b5", "For atleast 15 minutes", 5, "Exercise" });

            migrationBuilder.InsertData(
                table: "Habits",
                columns: new[] { "Id", "Color", "Description", "Goal", "Title" },
                values: new object[] { 3, "#701933", "For atleast 10 minutes", 2, "Meditate" });

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_Habits_HabitId",
                table: "Entries",
                column: "HabitId",
                principalTable: "Habits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entries_Habits_HabitId",
                table: "Entries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Habits",
                table: "Habits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Entries",
                table: "Entries");

            migrationBuilder.DeleteData(
                table: "Habits",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Habits",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Habits",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.RenameTable(
                name: "Habits",
                newName: "Habit");

            migrationBuilder.RenameTable(
                name: "Entries",
                newName: "Entry");

            migrationBuilder.RenameIndex(
                name: "IX_Entries_HabitId",
                table: "Entry",
                newName: "IX_Entry_HabitId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Habit",
                table: "Habit",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Entry",
                table: "Entry",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Entry_Habit_HabitId",
                table: "Entry",
                column: "HabitId",
                principalTable: "Habit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
