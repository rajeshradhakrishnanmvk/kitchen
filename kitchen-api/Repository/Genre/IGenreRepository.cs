using System.Collections.Generic;
using kitchen_api.Models;

namespace kitchen_api.Repository
{
    public interface IGenreRepository
    {
        Genre CreateGenre(Genre Genre);
        bool DeleteGenre(int GenreId);
        bool UpdateGenre(int GenreId, Genre Genre);
        Genre GetGenreById(int GenreId);
        List<Genre> GetAllGenres();
    }
}
