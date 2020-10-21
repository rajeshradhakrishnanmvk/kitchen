
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace kitchen_api.Models
{
    public class BookContext : IBookContext
    {
        private readonly IMongoDatabase database;
        MongoClient client;

        public BookContext(IConfiguration configuration)
        {
            client = new MongoClient(configuration.GetSection("MongoDB:ConnectionString").Value);
            database = client.GetDatabase(configuration.GetSection("MongoDB:Database").Value);
        }

        public IMongoCollection<Book> Books => database.GetCollection<Book>("book");
    }
}
