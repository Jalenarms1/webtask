using System.Reflection;
using WebTask.TaskService;
using WebTask.TaskService.Api;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using OpenTelemetry.Metrics;
using OpenTelemetry;
using WebTask.TaskService.Infrastructure;
using WebTask.Shared.Types;
using WebTask.Shared.DependencyInjection;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddWebTaskAuthentication(new JwtSettings
{
    Issuer = Environment.GetEnvironmentVariable("JWT_ISSUER")!,
    Audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE")!,
    Secret = Environment.GetEnvironmentVariable("JWT_SECRET")!
});

// builder.Services
//     .AddGraphQLServer()
//     .ModifyRequestOptions(opt => opt.IncludeExceptionDetails = builder.Environment.IsDevelopment())
//     .AddQueryType<Query>()
//     .AddMutationType<Mutation>()
//     .AddTypes(
//        Assembly.GetExecutingAssembly().GetTypes()
//         .Where(t => t.GetCustomAttribute<ExtendObjectTypeAttribute>() is not null).ToArray() 
//     )
//     .AddProjections()
//     .AddFiltering()
//     .AddSorting()
//     .AddAuthorization();

builder.Services.AddWebTaskSubgraph<Query, Mutation>(typeof(Program).Assembly, Assembly.GetExecutingAssembly().GetTypes()
                    .Where(t => t.GetCustomAttribute<ExtendObjectTypeAttribute>() is not null).ToArray(), modifyRequestOptions: (opt) => opt.IncludeExceptionDetails = builder.Environment.IsDevelopment());

builder.Services.AddHttpContextAccessor();

// builder.Logging.AddOpenTelemetry(opt =>
// {
//     opt.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(Environment.GetEnvironmentVariable("SERVICE_ID") ?? "no-service-configured"));
//     opt.IncludeScopes = true;
//     opt.IncludeFormattedMessage =true;
// });

// builder.Services.AddOpenTelemetry()
//     .WithTracing(o =>
//     {
//         o.SetResourceBuilder(ResourceBuilder.CreateDefault()
//             .AddService(Environment.GetEnvironmentVariable("SERVICE_ID") ?? "no-service-configured"));
//         o.AddAspNetCoreInstrumentation();
//         o.AddHttpClientInstrumentation();
//         // o.AddConsoleExporter();
//     })
//     .WithMetrics(o =>
//     {
//         o.SetResourceBuilder(ResourceBuilder.CreateDefault()
//             .AddService(Environment.GetEnvironmentVariable("SERVICE_ID") ?? "no-service-configured"));
//         o.AddAspNetCoreInstrumentation();
//         o.AddHttpClientInstrumentation();
//         // o.AddConsoleExporter();
//     })
//     .UseOtlpExporter();

builder.Logging.AddWebTaskOpenTelemetryLogging(Environment.GetEnvironmentVariable("SERVICE_ID") ?? "service-not-configured");

builder.Services.AddWebTaskOpenTelemetry(Environment.GetEnvironmentVariable("SERVICE_ID") ?? "service_not-configured");

builder.Services.AddTaskDb(Environment.GetEnvironmentVariable("TASK_DB_CONN")!);

builder.Services.AddHandlers();
builder.Services.AddServices();

var app = builder.Build();

app.UseRouting();

app.UseAuthentication();

app.Use(async (ctx, next) =>
{
    Console.WriteLine(ctx.User.Identity?.IsAuthenticated);
    Console.WriteLine(ctx.Request.Headers["Authorization"].ToString());
    await next();
});

app.UseAuthorization();

app.Use(async (context, next) =>
{
    var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();

    // Log method, path, headers
    logger.LogInformation("Incoming request: {Method} {Path} {Headers}", 
        context.Request.Method, 
        context.Request.Path,
        context.Request.Headers.ToDictionary(h => h.Key, h => h.Value.ToString()));

    await next();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.RequireAuthorization();

app.MapGraphQL();


app.RunWithGraphQLCommands(args);

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
