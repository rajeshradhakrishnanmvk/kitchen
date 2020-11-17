
using MongoDB.Driver;

namespace kitchen_api_chapter.Models
{
    public interface IChapterContext
    {
        IMongoCollection<Chapter> Chapters { get; }
    }
}
