using BookstoreApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BookstoreApi.Data;

public class BookstoreContext(DbContextOptions<BookstoreContext> options) : DbContext(options)
{
    public DbSet<Book> Books { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>(entity =>
        {
            entity.ToTable("Books");
            entity.HasKey(e => e.BookId);

            entity.Property(e => e.BookId).HasColumnName("BookID");
            entity.Property(e => e.Title).IsRequired();
            entity.Property(e => e.Author).IsRequired();
            entity.Property(e => e.Publisher).IsRequired();
            entity.Property(e => e.Isbn).HasColumnName("ISBN").IsRequired();
            entity.Property(e => e.Classification).IsRequired();
            entity.Property(e => e.Category).IsRequired();
            entity.Property(e => e.PageCount).IsRequired();
            entity.Property(e => e.Price).IsRequired();
        });
    }
}
