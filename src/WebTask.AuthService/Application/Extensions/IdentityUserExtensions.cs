

using Microsoft.AspNetCore.Identity;
using WebTask.Contracts.Dtos.Auth;

namespace WebTask.AuthService.Application.Extensions;

public static class IdentityUserExtensions
{
    public static UserDto ToUserDto(this IdentityUser identityUser)
    {
        return new UserDto(identityUser.Email ?? "");
    }
}