using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using kitchen_api.Models;


namespace kitchen_api.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly ILogger _logger;
        private readonly IBookContext context;
        public BookRepository(IBookContext dbContext, ILogger<BookRepository> logger)
        {
            context = dbContext;
        }

        public Book CreateBook(Book Book)
        {
             string Message = $"BookRepository method CreateBook call at {DateTime.UtcNow.ToLongTimeString()}";
            _logger.LogInformation(Message);
            try{
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
            catch(Exception oex)
            {
                _logger.LogInformation("Error in BookRepository " + oex.Message);
            }
           
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
            string Message = $"BookRepository method CreateBook call at {DateTime.UtcNow.ToLongTimeString()}";
            _logger.LogInformation(Message);
           try{
               return context.Books.Find(_ => true).ToList();
           }
            catch(Exception oex)
            {
                _logger.LogInformation("Error in BookRepository " + oex.Message);
            }
            
        }
        public bool UpdateBook(int BookId, Book Book)
        {
            context.Books.ReplaceOne(m => m.Id == BookId, Book);
            return true;
        }
    }
}
