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
            .ForMember(d => d.Score, entry => entry.MapFrom(s => s.Entries.Count));
        CreateMap<Entry, EntryResponse>()
            .ForMember(d => d.IsCompleted, o => o.MapFrom(s => true));
        CreateMap<Quote, QuoteResponse>();


        // .ForMember(dto => dto.Grades, x => x.MapFrom(p => p.Outcomes.SelectMany(o => o.Grades)));
    }
}

// public class EntryResponseIsCompletedResolver : ValueResolver<EntryResponse, boolean>
// {
// 	public int Resolve(Source source, Destination destination, int member, ResolutionContext context)
// 	{
//         return source.Value1 + source.Value2;
// 	}
// }
