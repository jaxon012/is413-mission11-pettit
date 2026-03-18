using System.ComponentModel.DataAnnotations;

namespace BookstoreApi.Models;

public class Book
{
    [Key]
    public int BookId { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Author { get; set; } = string.Empty;

    [Required]
    public string Publisher { get; set; } = string.Empty;

    [Required]
    public string Isbn { get; set; } = string.Empty;

    [Required]
    public string Classification { get; set; } = string.Empty;

    [Required]
    public string Category { get; set; } = string.Empty;

    [Required]
    public int PageCount { get; set; }

    [Required]
    public decimal Price { get; set; }
}
