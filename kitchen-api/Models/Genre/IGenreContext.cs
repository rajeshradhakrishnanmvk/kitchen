
using MongoDB.Driver;

namespace kitchen_api.Models
{
    public interface IGenreContext
    {
        IMongoCollection<Genre> Genres { get; }
    }
}
