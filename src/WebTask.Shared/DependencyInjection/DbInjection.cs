using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace WebTask.Shared.DependencyInjection;

public static class DbInjection
{
    public static IServiceCollection AddWebTaskDb<T>(this IServiceCollection services, string connString) where T : DbContext
    {
        services.AddDbContext<T>(opt =>
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
}
