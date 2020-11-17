using System;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using kitchen_api_book.Models;
using kitchen_api_book.Repository;
using kitchen_api_book.Exceptions;


namespace kitchen_api_book.Service
{
    public class BookService : IBookService
    {
        private readonly IBookRepository repository;
        private readonly ILogger _logger;
        public BookService(IBookRepository BookRepository, ILogger<BookService> logger)
        {
            repository = BookRepository;
             _logger = logger;
        }

        public Book CreateBook(Book Book)
        {
             string Message = $"BookService method CreateBook call at {DateTime.UtcNow.ToLongTimeString()}";
            _logger.LogInformation(Message);
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
