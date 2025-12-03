using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OpenTelemetry;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

namespace WebTask.Shared.DependencyInjection;

public static class OpenTelemetryInjection
{
    public static ILoggingBuilder AddWebTaskOpenTelemetryLogging(this ILoggingBuilder loggingBuilder, string serviceName)
    {
        loggingBuilder.AddOpenTelemetry(opt =>
        {
            opt.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(serviceName));
            opt.IncludeScopes = true;
            opt.IncludeFormattedMessage =true;
        });

        return loggingBuilder;
    }

    public static IServiceCollection AddWebTaskOpenTelemetry(this IServiceCollection services, string serviceName)
    {

        services.AddOpenTelemetry()
            .WithTracing(o =>
            {
                o.SetResourceBuilder(ResourceBuilder.CreateDefault()
                    .AddService(serviceName));
                o.AddAspNetCoreInstrumentation();
                o.AddHttpClientInstrumentation();
            })
            .WithMetrics(o =>
            {
                o.SetResourceBuilder(ResourceBuilder.CreateDefault()
                    .AddService(Environment.GetEnvironmentVariable("SERVICE_ID") ?? "no-service-configured"));
                o.AddAspNetCoreInstrumentation();
                o.AddHttpClientInstrumentation();
            })
            .UseOtlpExporter();


        return services;
    }
}
