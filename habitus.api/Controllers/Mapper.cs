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
    }
}
