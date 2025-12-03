using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebTask.Shared.Types;

namespace WebTask.TaskService.Api.Queries;

[ExtendObjectType("Query")]
public class GetTaskByIdQuery
{
    private readonly ILogger<GetTaskByIdQuery> _logger;
    public GetTaskByIdQuery(ILogger<GetTaskByIdQuery> logger)
    {
        _logger = logger;
    }   

    public int GetTaskById(int id, [Service] ClaimsPrincipal user)
    {
        Console.WriteLine();

        _logger.LogInformation("User getting task : {User}", user.FindFirst(ClaimTypes.Name)?.Value);

        return id;
    }
}
