using System;
using FluentValidation;
using WebTask.Contracts.Dtos.Auth;

namespace WebTask.AuthService.Application.Validation;

public class CreateUserDtoValidator : AbstractValidator<CreateUserDto>
{
    public CreateUserDtoValidator()
    {
        RuleFor(u => u.email)
            .EmailAddress()
            .NotEmpty();

        RuleFor(u => u.password)
            .NotEmpty()
            .NotNull()
            .MinimumLength(8);
    }
}
