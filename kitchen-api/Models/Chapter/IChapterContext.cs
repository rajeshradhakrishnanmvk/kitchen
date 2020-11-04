
using MongoDB.Driver;

namespace kitchen_api.Models
{
    public interface IChapterContext
    {
        IMongoCollection<Chapter> Chapters { get; }
    }
}
