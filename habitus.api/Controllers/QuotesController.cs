using habitus.api.Data.Interfaces;
using habitus.api.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace habitus.api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuotesController : ControllerBase
{
    private readonly IRepositoryManager _repository;

    public QuotesController(IRepositoryManager repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public ActionResult<QuoteResponse> GetRandomQuote()
    {
        QuoteResponse? quote = _repository.Quote.GetRandomQuote();

        return quote == null
            ? NotFound()
            : Ok(quote);
    }
}