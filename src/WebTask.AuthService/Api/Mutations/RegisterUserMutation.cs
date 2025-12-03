using System;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.AspNetCore.Identity;
using WebTask.AuthService.Application.Commands;
using WebTask.AuthService.Application.Extensions;
using WebTask.Contracts.Dtos.Auth;

namespace WebTask.AuthService.Api.Mutations;

[ExtendObjectType("Mutation")]
public class RegisterUserMutation
{
    public async Task<UserDto> RegisterUser(
        CreateUserDto createUserDto,
        [Service] RegisterUserHandler registerUserHandler,
        [Service] ILogger<RegisterUserMutation> logger)
    {
        var newUser = await registerUserHandler.HandleAsync(createUserDto);
        if(newUser.Error is not null) throw new GraphQLException(newUser.Error);

        if(newUser.Data is not IdentityUser user) throw new GraphQLException("user data not found");
        
        logger.LogInformation("New user : {UserId}", user.Id);

        return user.ToUserDto();
    }
}
