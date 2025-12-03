using System;
using Microsoft.EntityFrameworkCore;
using WebTask.TaskService.Domain.Entities;

namespace WebTask.TaskService.Infrastructure;

public class TaskDbContext : DbContext
{

    public TaskDbContext(DbContextOptions<TaskDbContext> options)
        : base(options)
    {
    }

    public DbSet<UserTask> UserTasks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.HasDefaultSchema("task");

        modelBuilder.Entity<UserTask>()
            .HasIndex(ut => ut.AssignedToUserId)
            .HasDatabaseName("IX_UserTasks_AssignedToUserId");

        modelBuilder.Entity<UserTask>()
            .HasIndex(ut => ut.CreatedByUserId)
            .HasDatabaseName("IX_UserTasks_CreatedByUserId");

        modelBuilder.Entity<UserTask>()
            .HasIndex(ut => ut.ProjectId)
            .HasDatabaseName("IX_UserTasks_ProjectId");
    }
}
