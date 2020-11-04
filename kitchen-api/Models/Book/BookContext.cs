using System;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Microsoft.Extensions.Logging;
namespace kitchen_api.Models
{
    public class BookContext : IBookContext
    {
        private readonly ILogger _logger;
        private readonly IMongoDatabase database;
        MongoClient client;


        public BookContext(IConfiguration configuration, ILogger<BookContext> logger)
        {
            try{
            //client = new MongoClient(configuration.GetSection("MongoDB:ConnectionString").Value);
            //database = client.GetDatabase(configuration.GetSection("MongoDB:Database").Value);
            this._logger = logger;
            client = new MongoClient(string.Format("mongodb://{0}", Environment.GetEnvironmentVariable("mongo_endpoint")));
            var databaseName = Environment.GetEnvironmentVariable("mongo_database_name") ?? "kitchen";
            database = client.GetDatabase(databaseName);
            _logger.LogInformation("Database connected to " + databaseName);
            // var collectionName = Environment.GetEnvironmentVariable("mongo_collection_name") ?? "book";
            // Collection = Database.GetCollection<BsonDocument>(collectionName);
            }
            catch(Exception oex)
            {
                _logger.LogInformation("Error in DB repo " + oex.Message);
            }
        }

        public IMongoCollection<Book> Books => database.GetCollection<Book>("book");
    }
}
