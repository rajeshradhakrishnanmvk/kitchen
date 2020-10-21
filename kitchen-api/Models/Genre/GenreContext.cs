
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace kitchen_api.Models
{
    public class GenreContext : IGenreContext
    {
        private readonly IMongoDatabase database;
        MongoClient client;

        public GenreContext(IConfiguration configuration)
        {
            client = new MongoClient(configuration.GetSection("MongoDB:ConnectionString").Value);
            database = client.GetDatabase(configuration.GetSection("MongoDB:Database").Value);
        }

        public IMongoCollection<Genre> Genres => database.GetCollection<Genre>("genre");
    }
}
