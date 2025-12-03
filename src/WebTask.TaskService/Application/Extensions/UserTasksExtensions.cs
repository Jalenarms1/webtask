using System;
using WebTask.Contracts.Dtos.Tasks;
using WebTask.TaskService.Domain.Entities;

namespace WebTask.TaskService.Application.Extensions;

public static class UserTasksExtensions
{
    public static TaskDto ToDto(this UserTask userTask)
    {
        return new TaskDto
        {
            UserTaskId = userTask.UserTaskId,
            Status = userTask.Status,
            CategoryId = userTask.CategoryId,
            Title = userTask.Title,
            Description = userTask.Description,
            CreatedByUserId = userTask.CreatedByUserId,
            AssignedToUserId = userTask.AssignedToUserId
        };
    }

    public static UserTask ToEntity(this CreateTaskDto taskDto)
    {
        return new UserTask
        {
            Status = taskDto.Status,
            CategoryId = taskDto.CategoryId,
            Title = taskDto.Title,
            Description = taskDto.Description,
            CreatedByUserId = taskDto.CreatedByUserId,
            AssignedToUserId = taskDto.AssignedToUserId
        };
    }
}
