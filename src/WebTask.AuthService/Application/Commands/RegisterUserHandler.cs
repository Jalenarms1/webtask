
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using WebTask.AuthService.Application.Validation;
using WebTask.Contracts.Dtos.Auth;
using WebTask.Shared.Interfaces;

namespace WebTask.AuthService.Application.Commands;

public class RegisterUserHandler : IHandler<IdentityUser, CreateUserDto>
{
    private readonly IAuthenticationService _authenticationService;
    private readonly UserManager<IdentityUser> _userManager;

    public RegisterUserHandler(IAuthenticationService authenticationService, UserManager<IdentityUser> userManager)
    {
        _authenticationService = authenticationService;
        _userManager = userManager;
    }

    public async Task<Result<IdentityUser>> HandleAsync(CreateUserDto createUserDto)
    {
        var existingUser = await _userManager.FindByEmailAsync(createUserDto.email);

        var validator = new CreateUserDtoValidator();
        var validationResult = await validator.ValidateAsync(createUserDto);

        if(!validationResult.IsValid) return Result<IdentityUser>.Failure(validationResult.Errors.FirstOrDefault()?.ErrorMessage ?? "an unexpected error occurred");

        if(existingUser is not null) return Result<IdentityUser>.Failure("a user with this email already exists");

        var passwordValidator = new PasswordValidator<IdentityUser>();
        var passwordValidationResp = await passwordValidator.ValidateAsync(_userManager, new(), createUserDto.password);
        
        if(!passwordValidationResp.Succeeded) return Result<IdentityUser>.Failure(passwordValidationResp.Errors.FirstOrDefault()?.Description ?? "invalid password");


        var newUser = new IdentityUser{Email = createUserDto.email, UserName = createUserDto.email};

        var createUserResp = await _userManager.CreateAsync(newUser, createUserDto.password);

        if(createUserResp.Errors.Any()) return Result<IdentityUser>.Failure(createUserResp.Errors.FirstOrDefault()?.Description ?? "");
        
        return Result<IdentityUser>.Success(newUser);
    }
}