using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using HotChocolate.Authorization;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebTask.Contracts.Dtos.Tasks;
using WebTask.Shared.Types;
using WebTask.TaskService.Application.Commands;

namespace WebTask.TaskService.Api.Mutations;

// [MutationType]
[ExtendObjectType("Mutation")]
public class CreateTaskMutation
{
    private readonly CreateTaskHandler _createTaskHandler;

    private readonly IHttpContextAccessor _httpContextAccessor;

    public CreateTaskMutation(CreateTaskHandler createTaskHandler, IHttpContextAccessor httpContextAccessor)
    {
        _createTaskHandler = createTaskHandler;
        _httpContextAccessor = httpContextAccessor;
    }

    [AllowAnonymous]
    // [Authorize]
    public async Task<TaskDto> CreateTask(CreateTaskDto taskDto)
    {
        Console.WriteLine($"Task '{taskDto.Title}' has been created.");
        Console.WriteLine($"User is authenticated: {_httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Name)?.Value}");
        
        var task = await _createTaskHandler.HandleAsync(taskDto);

        return task;
    }
}
