using AutoMapper;
using habitus.api.Models;

namespace habitus.api.Data;

public class Mapper : Profile
{
    public Mapper()
    {
        CreateMap<CreateHabitRequest, Habit>();
        CreateMap<UpdateHabitRequest, Habit>();
        CreateMap<CreateEntryRequest, Entry>();
        CreateMap<Habit, HabitResponse>()
            .ForMember(d => d.Score, entry => entry.MapFrom(s => (s.Entries != null) ? s.Entries.Count : 0));
        CreateMap<Entry, EntryResponse>()
            .ForMember(d => d.IsCompleted, o => o.MapFrom(s => true));
        CreateMap<Quote, QuoteResponse>();
    }
}
