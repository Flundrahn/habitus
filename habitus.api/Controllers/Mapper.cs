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
        CreateMap<Habit, HabitResponse>();
            // .ForMember(dto => dto.Entries, entry => entry.MapFrom(habit => habit.Entries));
        CreateMap<Entry, EntryResponse>();

        // .ForMember(dto => dto.Grades, x => x.MapFrom(p => p.Outcomes.SelectMany(o => o.Grades)));
    }
}
