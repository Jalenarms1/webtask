using System;
using System.Reflection;
using HotChocolate.Execution.Options;
using Microsoft.Extensions.DependencyInjection;

namespace WebTask.Shared.DependencyInjection;

public static class SubgraphInjection
{
    public static IServiceCollection AddWebTaskSubgraph<TQuery, TMutation>(this IServiceCollection services, Assembly assembly, Type[] types,  Action<RequestExecutorOptions>? modifyRequestOptions = null) where TQuery : class where TMutation : class
    {
        services
            .AddGraphQLServer()
            .ModifyRequestOptions(modifyRequestOptions is not null ? modifyRequestOptions : (opt) => {})
            .AddQueryType<TQuery>()
            .AddMutationType<TMutation>()
            .AddTypes(
                types 
            )
            .AddProjections()
            .AddFiltering()
            .AddSorting()
            .AddAuthorization();
        return services;
    }
}
