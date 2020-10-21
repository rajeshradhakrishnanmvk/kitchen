using System.Collections.Generic;
using kitchen_api.Models;
using kitchen_api.Repository;
using kitchen_api.Exceptions;


namespace kitchen_api.Service
{
    public class GenreService : IGenreService
    {
        private readonly IGenreRepository repository;

        public GenreService(IGenreRepository GenreRepository)
        {
            repository = GenreRepository;
        }

        public Genre CreateGenre(Genre Genre)
        {
            Genre createdUser = repository.CreateGenre(Genre);
            if (createdUser != null)
            {
                return createdUser;
            }
            else
            {
                throw new RecordNotCreatedException($"This Genre id already exists");
            }
        }

        public bool DeleteGenre(int GenreId)
        {
            bool result = repository.DeleteGenre(GenreId);
            if (result)
            {
                return result;
            }
            else
            {
                throw new RecordNotFoundException($"This Genre id not found");
            }
        }


        public Genre GetGenreById(int GenreId)
        {
            Genre queryGenre = repository.GetGenreById(GenreId);
            if (queryGenre != null)
            {
                return queryGenre;
            }
            else
            {
                throw new RecordNotFoundException($"This Genres not found");
            }
        }
        public List<Genre> GetGenre()
        {
            return repository.GetAllGenres();
        }

        public bool UpdateGenre(int GenreId, Genre Genre)
        {
            bool result = repository.UpdateGenre(GenreId, Genre);
            if (result)
            {
                return result;
            }
            else
            {
                throw new RecordNotFoundException($"This Genre id not found");
            }
        }
    }
}
