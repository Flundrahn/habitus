using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var connectionStringName = "AppContextLocal";

builder.Services.AddDbContext<AppContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString(connectionStringName)
        ?? throw new InvalidOperationException($"Connection string {connectionStringName} not found.")
    )
);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using (var scope = app.Services.CreateScope())
    using (var dbContext = scope.ServiceProvider.GetRequiredService<AppContext>())
    {
        try
        {
            // NOTE Using EnsureCreated is not recommended for relational db if one plans to use EF Migrations
            dbContext.Database.EnsureCreated();
        }
        catch (Exception ex)
        {
            Console.WriteLine("An error occurred while creating the DB.");
            Console.WriteLine(ex.Message);
            throw;
        }
    }
}

// TODO Configure this for security
app.UseCors(options => options
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
