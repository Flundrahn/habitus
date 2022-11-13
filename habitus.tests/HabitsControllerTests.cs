using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using habitus.api.Data;
using habitus.api.Models;

namespace habitus.tests;

public class HabitsControllerIntegrationTests
{
    private readonly HttpClient _client;

    public HabitsControllerIntegrationTests()
    {   
        _client = new WebApiApplication().CreateClient();
    }

    [Fact]
    public async Task Get_should_return_status_200()
    {
        // Arrange
        var habits = SeedData.Habits();

        // Act
        var response = await _client.GetAsync($"/api/habits/{habits[0].Id}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task Get_should_return_correct_entity()
    {
        // Arrange
        var habits = SeedData.Habits();

        // Act
        var result = await _client.GetFromJsonAsync<HabitResponse>($"/api/habits/{habits[0].Id}");

        // Assert
        result.Should().NotBeNull();
        result!.Id.Should().Be(habits[0].Id);
        result.Title.Should().Be(habits[0].Title);
        result.Goal.Should().Be(habits[0].Goal);
        result.Color.Should().Be(habits[0].Color);
        result.Description.Should().Be(habits[0].Description);
    }

    [Fact]
    public async Task Get_should_status_404()
    {
        // Arrange
        var id = 999;

        // Act
        var response = await _client.GetAsync($"/api/habits/{id}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}