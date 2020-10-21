
using MongoDB.Driver;

namespace kitchen_api.Models
{
    public interface IBookContext
    {
        IMongoCollection<Book> Books { get; }
    }
}
