using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace habitus.api.Migrations
{
    public partial class ChangeUserIdToString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Habits",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Entries",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.UpdateData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserId",
                value: "1");

            migrationBuilder.UpdateData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserId",
                value: "1");

            migrationBuilder.UpdateData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 3,
                column: "UserId",
                value: "1");

            migrationBuilder.UpdateData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 4,
                column: "UserId",
                value: "1");

            migrationBuilder.UpdateData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 5,
                column: "UserId",
                value: "1");

            migrationBuilder.UpdateData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 6,
                column: "UserId",
                value: "1");

            migrationBuilder.UpdateData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 7,
                column: "UserId",
                value: "1");

            migrationBuilder.UpdateData(
                table: "Habits",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserId",
                value: "1");

            migrationBuilder.UpdateData(
                table: "Habits",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserId",
                value: "1");

            migrationBuilder.UpdateData(
                table: "Habits",
                keyColumn: "Id",
                keyValue: 3,
                column: "UserId",
                value: "1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Habits",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Entries",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.UpdateData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 3,
                column: "UserId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 4,
                column: "UserId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 5,
                column: "UserId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 6,
                column: "UserId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 7,
                column: "UserId",
                value: 1);

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
    }
}
