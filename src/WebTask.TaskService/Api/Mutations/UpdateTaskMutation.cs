using System;
using HotChocolate.Authorization;
using WebTask.Contracts.Dtos.Tasks;
using WebTask.TaskService.Application.Commands;

namespace WebTask.TaskService.Api.Mutations;

// [ExtendObjectType("Mutation")]
[ExtendObjectType<Mutation>]

public class UpdateTaskMutation
{
    private readonly CreateTaskHandler _createTaskHandler;

    public UpdateTaskMutation(CreateTaskHandler createTaskHandler)
    {
        _createTaskHandler = createTaskHandler;
    }

    [AllowAnonymous]
    public async Task<TaskDto> UpdateTask(CreateTaskDto taskDto)
    {
        Console.WriteLine($"Task '{taskDto.Title}' has been updated.");
        
        return new ();
    }
}
