using System.Collections.Generic;
using System.Linq;
using kitchen_api.Models;
using MongoDB.Driver;

namespace kitchen_api.Repository
{
    public class BookRepository : IBookRepository
    {

        private readonly IBookContext context;
        public BookRepository(IBookContext dbContext)
        {
            context = dbContext;
        }

        public Book CreateBook(Book Book)
        {
            //Auto increment PK
            //Get MAX
            var lastBook = (from rd in GetAllBooks()
                            orderby rd.Id descending
                            select rd).ToList().FirstOrDefault();
            //If Present increment by 1
            Book.Id = lastBook != null ? lastBook.Id + 1 : 100;
            context.Books.InsertOne(Book);
            return Book;
        }

        public bool DeleteBook(int BookId)
        {
            context.Books.DeleteOne(u => u.Id == BookId);
            return true;
        }



        public List<Book> GetAllBooks()
        {
            return context.Books.Find(_ => true).ToList();
        }

        public Book GetBookById(int BookId)
        {
            return context.Books.Find(u => u.Id == BookId).FirstOrDefault();
        }
        public List<Book> GetBooks()
        {
            return context.Books.Find(_ => true).ToList();
        }
        public bool UpdateBook(int BookId, Book Book)
        {
            context.Books.ReplaceOne(m => m.Id == BookId, Book);
            return true;
        }
    }
}
