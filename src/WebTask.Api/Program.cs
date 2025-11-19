using OpenTelemetry;
using OpenTelemetry.Logs;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

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

builder.Services.AddHttpClient("Fusion")
    .AddHttpMessageHandler(provider =>
        new ForwardHeadersHandler(provider.GetRequiredService<IHttpContextAccessor>()));

builder.Services.AddHttpContextAccessor();
    
builder.Services
    .AddFusionGatewayServer()
    .ConfigureFromFile("gateway.fgp")
    .ModifyFusionOptions(x => x.AllowQueryPlan = true);

var app = builder.Build();

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

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

public class ForwardHeadersHandler : DelegatingHandler
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ForwardHeadersHandler(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var headers = _httpContextAccessor.HttpContext?.Request.Headers;

        if (headers != null)
        {
            if (headers.TryGetValue("Authorization", out var auth))
            {
                // Remove "Bearer " if already present
                var token = auth.ToString().Replace("Bearer ", "");
                request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            }
        }

        return await base.SendAsync(request, cancellationToken);
    }
}

