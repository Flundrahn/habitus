using habitus.api.Models;

namespace habitus.api.Extensions;

static class ExtensionsClass
{
    public static HabitResponse? PopulateUncompletedEntries(this HabitResponse response, DateTime startDate, DateTime endDate)
    {
        // NOTE Should I do anything about the null warning here?
        var datesToAdd = GetDatesBetween(startDate, endDate)
            .Except(response.Entries.Select(e => e.Date));

        foreach (var date in datesToAdd)
        {
            response.Entries.Add(new EntryResponse
            {
                HabitId = response.Id,
                Date = date,
                IsCompleted = false
            });
        }
        response.Entries = response.Entries
            .OrderBy(e => e.Date)
            .ToArray();

        return response;
    }

    static List<DateTime> GetDatesBetween(DateTime startDate, DateTime endDate)
    {
        var dates = new List<DateTime>();
        for (var date = startDate; date <= endDate; date = date.AddDays(1))
        {
            dates.Add(date);
        }

        return dates;
    }
}