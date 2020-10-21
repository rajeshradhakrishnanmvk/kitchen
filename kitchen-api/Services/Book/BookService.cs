using System.Collections.Generic;
using kitchen_api.Models;
using kitchen_api.Repository;
using kitchen_api.Exceptions;


namespace kitchen_api.Service
{
    public class BookService : IBookService
    {
        private readonly IBookRepository repository;

        public BookService(IBookRepository BookRepository)
        {
            repository = BookRepository;
        }

        public Book CreateBook(Book Book)
        {
            Book createdUser = repository.CreateBook(Book);
            if (createdUser != null)
            {
                return createdUser;
            }
            else
            {
                throw new RecordNotCreatedException($"This Book id already exists");
            }
        }

        public bool DeleteBook(int BookId)
        {
            bool result = repository.DeleteBook(BookId);
            if (result)
            {
                return result;
            }
            else
            {
                throw new RecordNotFoundException($"This Book id not found");
            }
        }


        public Book GetBookById(int BookId)
        {
            Book queryBook = repository.GetBookById(BookId);
            if (queryBook != null)
            {
                return queryBook;
            }
            else
            {
                throw new RecordNotFoundException($"This Book id not found");
            }
        }

        public List<Book> GetBooks()
        {
            return repository.GetBooks();
        }
        public bool UpdateBook(int BookId, Book Book)
        {
            bool result = repository.UpdateBook(BookId, Book);
            if (result)
            {
                return result;
            }
            else
            {
                throw new RecordNotFoundException($"This Book id not found");
            }
        }
    }
}
