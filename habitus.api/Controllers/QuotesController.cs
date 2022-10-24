using habitus.api.Data;
using habitus.api.Models;
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
        // QuoteResponse? quote = await _repository.Quote.GetRandomQuote();
        QuoteResponse? quote = _repository.Quote.GetRandomQuote();

        if (quote == null) return NotFound();

        return Ok(quote);
    }
}