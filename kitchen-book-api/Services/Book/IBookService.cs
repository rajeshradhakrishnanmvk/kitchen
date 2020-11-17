using System.Collections.Generic;
using kitchen_api_book.Models;

namespace kitchen_api_book.Service
{
    public interface IBookService
    {
        Book CreateBook(Book Book);
        bool DeleteBook(int BookId);
        bool UpdateBook(int BookId, Book Book);
        Book GetBookById(int BookId);
        List<Book> GetBooks();

    }
}
