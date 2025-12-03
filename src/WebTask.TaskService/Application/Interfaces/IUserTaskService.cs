using System;
using WebTask.Contracts.Dtos.Tasks;

namespace WebTask.TaskService.Application.Interfaces;

public interface IUserTaskService
{
    Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto);
}
