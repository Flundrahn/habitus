using habitus.api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using FirebaseAdmin;
using habitus.api.Auth;
using Microsoft.AspNetCore.Authorization;
using habitus.api.Models;

var builder = WebApplication.CreateBuilder(args);
var connectionStringName = "DbContextLocal";

builder.Services.AddDbContext<HabitusDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString(connectionStringName)
        ?? throw new InvalidOperationException($"Connection string {connectionStringName} not found.")
    )
);
builder.Services.AddControllers();
builder.Services.AddSingleton(FirebaseApp.Create());
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddScheme<AuthenticationSchemeOptions, FirebaseAuthHandler>(
        JwtBearerDefaults.AuthenticationScheme, options => { }
    );

// TODO Test this, spend one day one testing an auth API
// builder.Services.AddSingleton<
//     AuthorizationHandler<SameUserAuthorizationRequirement, IHabitusResource>,
//     HabitusAuthorizationHandler>();
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("SameUser", policy =>
        policy.Requirements.Add(new SameUserAuthorizationRequirement())
    );
});

builder.Services.AddSingleton<IAuthorizationHandler, HabitusAuthorizationHandler>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using (var scope = app.Services.CreateScope())
    using (var dbContext = scope.ServiceProvider.GetRequiredService<HabitusDbContext>())
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
    .SetIsOriginAllowed(origin => true)
    .AllowAnyHeader()
    .AllowAnyMethod());
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
