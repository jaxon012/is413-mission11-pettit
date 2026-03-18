using BookstoreApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookstoreApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BooksController(BookstoreContext context) : ControllerBase
{
    private readonly BookstoreContext _context = context;

    [HttpGet]
    public async Task<IActionResult> GetBooks(
        [FromQuery] int pageSize = 5,
        [FromQuery] int pageNum = 1,
        [FromQuery] string sortOrder = "asc")
    {
        pageSize = pageSize <= 0 ? 5 : pageSize;
        pageNum = pageNum <= 0 ? 1 : pageNum;

        var query = _context.Books.AsQueryable();

        query = sortOrder.ToLower() == "desc"
            ? query.OrderByDescending(b => b.Title)
            : query.OrderBy(b => b.Title);

        var books = await query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var totalNumBooks = await _context.Books.CountAsync();

        return Ok(new
        {
            books,
            totalNumBooks
        });
    }
}
