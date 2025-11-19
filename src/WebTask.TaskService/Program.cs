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


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false, // for testing
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET"))), // must match token
                RoleClaimType = ClaimTypes.Role,
                NameClaimType = ClaimTypes.Name
            };
        });

builder.Services.AddAuthorization();

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddTypes(
       Assembly.GetExecutingAssembly().GetTypes()
        .Where(t => t.GetCustomAttribute<ExtendObjectTypeAttribute>() != null).ToArray() 
    )
    .AddProjections()
    .AddFiltering()
    .AddSorting()
    .AddAuthorization();

builder.Services.AddHttpContextAccessor();

builder.Logging.AddOpenTelemetry(opt =>
{
    opt.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(Environment.GetEnvironmentVariable("SERVICE_ID")));
    opt.IncludeScopes = true;
    opt.IncludeFormattedMessage =true;
});

builder.Services.AddOpenTelemetry()
    .WithTracing(o =>
    {
        o.SetResourceBuilder(ResourceBuilder.CreateDefault()
            .AddService(Environment.GetEnvironmentVariable("SERVICE_ID")));
        o.AddAspNetCoreInstrumentation();
        o.AddHttpClientInstrumentation();
        // o.AddConsoleExporter();
    })
    .WithMetrics(o =>
    {
        o.SetResourceBuilder(ResourceBuilder.CreateDefault()
            .AddService(Environment.GetEnvironmentVariable("SERVICE_ID")));
        o.AddAspNetCoreInstrumentation();
        o.AddHttpClientInstrumentation();
        // o.AddConsoleExporter();
    })
    .UseOtlpExporter();


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
