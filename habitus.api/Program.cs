using habitus.api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using FirebaseAdmin;
using habitus.api.Auth;

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
// QUESTION Could I use a singleton here? When should I use scoped / singleton / 
// SCOPED: The service is created once per request. "This is a good option when want to
// maintain state within request".
// TRANSIENT: The service is created each time it is called. This allows multithreading since there can be multiple
// instances in one request. Will use more memory and resources, can have negative impact on performance.
// " Utilize for lightweight, stateless services. "
// SINGLETON: The service is created once and shared across all requests.
// Note memory leaks in such a service will build up over time. Is memory efficient since only one instance which
// is reused everywhere.

builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddScheme<AuthenticationSchemeOptions, FirebaseAuthHandler>(
        JwtBearerDefaults.AuthenticationScheme, options => { }
    );

// TODO Test this, spend one day one testing an auth API
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("SameUser", policy =>
    {
        policy.AddRequirements(new SameUserAuthorizationRequirement());
    });
});
// TODO Remove jwtbearer if unnecessary. NOTE It would be a lot nicer if this worked as intended.
// .AddJwtBearer(options =>
// {
//     string firebaseProjectId = builder.Configuration.GetValue<string>("FirebaseAppId")
//         ?? throw new InvalidOperationException("Environment variable FirebaseAppId not found.");

//     options.SaveToken = true;
//     options.IncludeErrorDetails = true;

//     options.Authority = $"https://securetoken.google.com/{firebaseProjectId}/";
//     options.TokenValidationParameters = new TokenValidationParameters
//     {
//         ValidateIssuer = true,
//         ValidIssuer = $"https://securetoken.google.com/{firebaseProjectId}/",
//         ValidateAudience = true,
//         ValidAudience = firebaseProjectId,
//         ValidateLifetime = true,

//     };
// });

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
    // .WithOrigins("http://localhost:3000/")
    .SetIsOriginAllowed(origin => true)
    // .AllowCredentials()
    .AllowAnyHeader()
    .AllowAnyMethod());
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
