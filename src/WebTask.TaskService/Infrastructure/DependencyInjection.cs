using System;
using System.Reflection;
using Microsoft.EntityFrameworkCore;

namespace WebTask.TaskService.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddTaskDb(this IServiceCollection services, string connString)
    {
        services.AddDbContext<TaskDbContext>(opt =>
        {
            opt.UseSqlServer(
                connString,
                sqlOptions =>
                {
                    sqlOptions.EnableRetryOnFailure(
                        maxRetryCount: 5,
                        maxRetryDelay: TimeSpan.FromSeconds(30),
                        errorNumbersToAdd: null);
                }
            );
        });

        return services;
    }

    public static IServiceCollection AddHandlers(this IServiceCollection services)
    {
        var handlers = Assembly.GetExecutingAssembly()
            .GetTypes()
            .Where(t => t.Name.EndsWith("Handler") && !t.IsAbstract);

        foreach(var h in handlers)
        {
            services.AddScoped(h);
        }

        return services;
    }

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        var registeringServices = Assembly.GetExecutingAssembly()
            .GetTypes()
            .Where(t => t.Name.EndsWith("Service") && !t.IsAbstract && t.IsClass);

        foreach(var s in registeringServices)
        {
            foreach(var i in s.GetInterfaces())
            {
                services.AddScoped(i, s);
            }
        }

        return services;
    }
}
