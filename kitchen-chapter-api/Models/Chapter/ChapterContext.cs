
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace kitchen_api_chapter.Models
{
    public class ChapterContext : IChapterContext
    {
        private readonly IMongoDatabase database;
        MongoClient client;

        public ChapterContext(IConfiguration configuration)
        {
            client = new MongoClient(configuration.GetSection("MongoDB:ConnectionString").Value);
            database = client.GetDatabase(configuration.GetSection("MongoDB:Database").Value);
        }

        public IMongoCollection<Chapter> Chapters => database.GetCollection<Chapter>("chapter");
    }
}
