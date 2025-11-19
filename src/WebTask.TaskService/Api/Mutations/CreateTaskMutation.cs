using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HotChocolate.Authorization;
using Microsoft.IdentityModel.Tokens;
using WebTask.Contracts.Dtos.Tasks;

namespace WebTask.TaskService.Api.Mutations;

[Authorize]
[ExtendObjectType("Mutation")]
public class CreateTaskMutation
{
    // [AllowAnonymous]
    public TaskDto CreateTask(TaskDto taskDto)
    {
        Console.WriteLine($"Task '{taskDto.Title}' has been created.");
        var secret = Environment.GetEnvironmentVariable("JWT_SECRET") ?? "";
        Console.WriteLine(secret);
        try
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: new[] { new Claim(ClaimTypes.Name, "LocalUser"), new Claim(ClaimTypes.Role, "Admin") },
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            Console.WriteLine(jwt);
            
        }
        catch(Exception ex)
        {
            Console.WriteLine(ex);
        }

        return taskDto;
    }
}
