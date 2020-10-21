using kitchen_api.Models;
using System.Collections.Generic;

namespace kitchen_api.Service
{
    public interface IGenreService
    {
        Genre CreateGenre(Genre Genre);
        bool DeleteGenre(int GenreId);
        bool UpdateGenre(int GenreId, Genre Genre);
        Genre GetGenreById(int GenreId);
        List<Genre> GetGenre();

    }
}
