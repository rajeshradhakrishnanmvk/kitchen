using System.Collections.Generic;
using kitchen_api.Models;
using kitchen_api.Repository;
using kitchen_api.Exceptions;


namespace kitchen_api.Service
{
    public class ChapterService : IChapterService
    {
        private readonly IChapterRepository repository;

        public ChapterService(IChapterRepository ChapterRepository)
        {
            repository = ChapterRepository;
        }

        public Chapter CreateChapter(Chapter Chapter)
        {
            Chapter createdUser = repository.CreateChapter(Chapter);
            if (createdUser != null)
            {
                return createdUser;
            }
            else
            {
                throw new RecordNotCreatedException($"This Chapter id already exists");
            }
        }

        public bool DeleteChapter(int ChapterId)
        {
            bool result = repository.DeleteChapter(ChapterId);
            if (result)
            {
                return result;
            }
            else
            {
                throw new RecordNotFoundException($"This Chapter id not found");
            }
        }


        public Chapter GetChapterById(int ChapterId)
        {
            Chapter queryChapter = repository.GetChapterById(ChapterId);
            if (queryChapter != null)
            {
                return queryChapter;
            }
            else
            {
                throw new RecordNotFoundException($"This Chapters not found");
            }
        }
        public List<Chapter> GetChapter()
        {
            return repository.GetAllChapters();
        }

        public bool UpdateChapter(int ChapterId, Chapter Chapter)
        {
            bool result = repository.UpdateChapter(ChapterId, Chapter);
            if (result)
            {
                return result;
            }
            else
            {
                throw new RecordNotFoundException($"This Chapter id not found");
            }
        }
    }
}
