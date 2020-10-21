using System.Collections.Generic;
using System.Linq;
using kitchen_api.Models;
using MongoDB.Driver;

namespace kitchen_api.Repository
{
    public class GenreRepository : IGenreRepository
    {

        private readonly IGenreContext context;
        public GenreRepository(IGenreContext dbContext)
        {
            context = dbContext;
        }

        public Genre CreateGenre(Genre Genre)
        {
            //Auto increment PK
            //Get MAX
            var lastGenre = (from rd in GetAllGenres()
                             orderby rd.Id descending
                             select rd).ToList().FirstOrDefault();
            //If Present increment by 1
            Genre.Id = lastGenre != null ? lastGenre.Id + 1 : 100;
            context.Genres.InsertOne(Genre);
            return Genre;
        }

        public bool DeleteGenre(int GenreId)
        {
            context.Genres.DeleteOne(u => u.Id == GenreId);
            return true;
        }

        public List<Genre> GetAllGenres()
        {
            return context.Genres.Find(_ => true).ToList();
        }

        public Genre GetGenreById(int GenreId)
        {
            return context.Genres.Find(u => u.Id == GenreId).FirstOrDefault();
        }


        public bool UpdateGenre(int GenreId, Genre Genre)
        {
            context.Genres.ReplaceOne(m => m.Id == GenreId, Genre);
            return true;
        }
    }
}
