using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace habitus.api.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Habits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Goal = table.Column<int>(type: "INTEGER", nullable: false),
                    Color = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Habits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Entries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    HabitId = table.Column<int>(type: "INTEGER", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Entries_Habits_HabitId",
                        column: x => x.HabitId,
                        principalTable: "Habits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "HabitId" },
                values: new object[] { 10, new DateTime(2022, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 });

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "HabitId" },
                values: new object[] { 11, new DateTime(2022, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 });

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "HabitId" },
                values: new object[] { 12, new DateTime(2022, 10, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 });

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "HabitId" },
                values: new object[] { 13, new DateTime(2022, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 });

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "HabitId" },
                values: new object[] { 14, new DateTime(2022, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 });

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "HabitId" },
                values: new object[] { 15, new DateTime(2022, 10, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 });

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "HabitId" },
                values: new object[] { 16, new DateTime(2022, 10, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 });

            migrationBuilder.CreateIndex(
                name: "IX_Entries_HabitId",
                table: "Entries",
                column: "HabitId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Entries");

            migrationBuilder.DropTable(
                name: "Habits");
        }
    }
}
