using System;
using HotChocolate.Types;

namespace WebTask.AuthService.Api.Queries;

[ExtendObjectType("Query")]
public class GetVersionQuery
{
    public int GetSecondVersion()
    {
        return 1;
    }
}
