using System;
using WebTask.Contracts.Dtos.Tasks;
using WebTask.TaskService.Application.Interfaces;

namespace WebTask.TaskService.Application.Commands;

public class CreateTaskHandler
{
    private readonly IUserTaskService _userTaskService;

    public CreateTaskHandler(IUserTaskService userTaskService)
    {
        _userTaskService = userTaskService;
    }

    public async Task<TaskDto> HandleAsync(CreateTaskDto createTaskDto)
    {
        return await _userTaskService.CreateTaskAsync(createTaskDto);
    }
    
}
