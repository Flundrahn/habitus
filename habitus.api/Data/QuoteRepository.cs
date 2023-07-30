using AutoMapper;
using habitus.api.Data.Interfaces;
using habitus.api.Dtos;

namespace habitus.api.Data;

public class QuoteRepository : IQuoteRepository
{
    private readonly IMapper _mapper;

    public QuoteRepository(IMapper mapper)
    {
        _mapper = mapper;
    }

    public QuoteResponse? GetRandomQuote()
    {
        var quotes = SeedData.Quotes();

        return quotes is null
            ? null 
            : _mapper.Map<QuoteResponse>(quotes[new Random().Next(0, quotes.Length)]);
    }
}