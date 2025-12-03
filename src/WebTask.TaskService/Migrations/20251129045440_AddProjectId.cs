using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTask.TaskService.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                schema: "task",
                table: "UserTasks",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserTasks_ProjectId",
                schema: "task",
                table: "UserTasks",
                column: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserTasks_ProjectId",
                schema: "task",
                table: "UserTasks");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                schema: "task",
                table: "UserTasks");
        }
    }
}
