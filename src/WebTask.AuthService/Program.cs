using System.Reflection;
using HotChocolate.Types;
using Microsoft.AspNetCore.Identity;
using WebTask.AuthService.Api;
using WebTask.AuthService.Infrastructure;
using WebTask.Shared.DependencyInjection;
using WebTask.Shared.Types;
using WebTask.TaskService.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var jwtSettings = new JwtSettings
{
    Issuer = Environment.GetEnvironmentVariable("JWT_ISSUER")!,
    Audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE")!,
    Secret = Environment.GetEnvironmentVariable("JWT_SECRET")!
};

builder.Services.Configure<JwtSettings>(config =>
{
    config.Audience = jwtSettings.Audience!;
    config.Issuer = jwtSettings.Issuer!;
    config.Secret = jwtSettings.Secret!;
});

builder.Services.AddWebTaskSubgraph<Query, Mutation>(typeof(Program).Assembly, Assembly.GetExecutingAssembly().GetTypes()
        .Where(t => t.GetCustomAttribute<ExtendObjectTypeAttribute>() is not null).ToArray(), modifyRequestOptions: (opt) => opt.IncludeExceptionDetails = builder.Environment.IsDevelopment());


builder.Services.AddWebTaskAuthentication(jwtSettings);

builder.Logging.AddWebTaskOpenTelemetryLogging(Environment.GetEnvironmentVariable("SERVICE_ID") ?? "service-not-configured");

builder.Services.AddWebTaskOpenTelemetry(Environment.GetEnvironmentVariable("SERVICE_ID") ?? "service-not-configured");

builder.Services.AddWebTaskDb<AuthDbContext>(Environment.GetEnvironmentVariable("AUTH_DB_CONN"));

builder.Services.AddHandlers();

builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
})
.AddEntityFrameworkStores<AuthDbContext>()
.AddDefaultTokenProviders();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

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
.WithName("GetWeatherForecast");

app.MapGraphQL();

app.RunWithGraphQLCommands(args);

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
