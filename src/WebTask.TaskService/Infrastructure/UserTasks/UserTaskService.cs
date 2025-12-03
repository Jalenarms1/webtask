using System;
using WebTask.Contracts.Dtos.Tasks;
using WebTask.TaskService.Application.Extensions;
using WebTask.TaskService.Application.Interfaces;

namespace WebTask.TaskService.Infrastructure.UserTasks;

public class UserTaskService : IUserTaskService
{
    private readonly TaskDbContext _dbContext;

    public UserTaskService(TaskDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto)
    {
        var userTask = createTaskDto.ToEntity();

        _dbContext.UserTasks.Add(userTask);
        await _dbContext.SaveChangesAsync();

        return userTask.ToDto();
    }
}
