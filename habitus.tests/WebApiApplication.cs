using habitus.api.Data;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace habitus.tests;

class WebApiApplication : WebApplicationFactory<Program>
{
    protected override IHost CreateHost(IHostBuilder builder)
    {
        builder.UseEnvironment("Testing");

        builder.ConfigureServices(services =>
        {
            var descriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(DbContextOptions<HabitusDbContext>)
            );
            if (descriptor != null) services.Remove(descriptor);

            string dbName = "DbForTesting";
            services.AddDbContext<HabitusDbContext>(options =>
            {
                options.UseInMemoryDatabase(dbName);
            });

            var serviceProvider = services.BuildServiceProvider();
            using var scope = serviceProvider.CreateScope();
            using var dbContext = scope.ServiceProvider.GetRequiredService<HabitusDbContext>();
            try
            {
                dbContext.Database.EnsureCreated();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        });

        return base.CreateHost(builder);
    }
}