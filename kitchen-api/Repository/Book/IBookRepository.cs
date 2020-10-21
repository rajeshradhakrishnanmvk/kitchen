using System.Collections.Generic;
using kitchen_api.Models;

namespace kitchen_api.Repository
{
    public interface IBookRepository
    {
        Book CreateBook(Book Book);
        bool DeleteBook(int BookId);
        bool UpdateBook(int BookId, Book Book);
        Book GetBookById(int BookId);

        List<Book> GetBooks();
    }
}
