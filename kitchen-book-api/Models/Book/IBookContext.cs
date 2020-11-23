
using MongoDB.Driver;

namespace kitchen_api_book.Models
{
    public interface IBookContext
    {
        IMongoCollection<Book> Books { get; }
    }
}
