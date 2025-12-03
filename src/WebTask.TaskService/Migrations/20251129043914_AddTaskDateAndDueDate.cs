using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTask.TaskService.Migrations
{
    /// <inheritdoc />
    public partial class AddTaskDateAndDueDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                schema: "task",
                table: "UserTasks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                schema: "task",
                table: "UserTasks",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                schema: "task",
                table: "UserTasks");

            migrationBuilder.DropColumn(
                name: "DueDate",
                schema: "task",
                table: "UserTasks");
        }
    }
}
