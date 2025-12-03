using System;
using HotChocolate.Types;

namespace WebTask.AuthService.Api.Mutations;

[ExtendObjectType("Mutation")]
public class LoginMutation
{
    public bool Login(string username)
    {
        return true;
    }
}
