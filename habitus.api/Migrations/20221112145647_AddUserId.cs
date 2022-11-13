using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace habitus.api.Migrations
{
    public partial class AddUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Habits",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Entries",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "HabitId", "UserId" },
                values: new object[] { 1, new DateTime(2022, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1 });

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "HabitId", "UserId" },
                values: new object[] { 2, new DateTime(2022, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1 });

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "HabitId", "UserId" },
                values: new object[] { 3, new DateTime(2022, 10, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1 });

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "HabitId", "UserId" },
                values: new object[] { 4, new DateTime(2022, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 1 });

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "HabitId", "UserId" },
                values: new object[] { 5, new DateTime(2022, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 1 });

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "HabitId", "UserId" },
                values: new object[] { 6, new DateTime(2022, 10, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 1 });

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Date", "HabitId", "UserId" },
                values: new object[] { 7, new DateTime(2022, 10, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 1 });

            migrationBuilder.UpdateData(
                table: "Habits",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Habits",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Habits",
                keyColumn: "Id",
                keyValue: 3,
                column: "UserId",
                value: 1);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Habits");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Entries");

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
        }
    }
}
