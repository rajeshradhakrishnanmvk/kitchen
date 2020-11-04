using System.Collections.Generic;
using System.Linq;
using kitchen_api.Models;
using MongoDB.Driver;

namespace kitchen_api.Repository
{
    public class ChapterRepository : IChapterRepository
    {

        private readonly IChapterContext context;
        public ChapterRepository(IChapterContext dbContext)
        {
            context = dbContext;
        }

        public Chapter CreateChapter(Chapter Chapter)
        {
            //Auto increment PK
            //Get MAX
            var lastChapter = (from rd in GetAllChapters()
                             orderby rd.Id descending
                             select rd).ToList().FirstOrDefault();
            //If Present increment by 1
            Chapter.Id = lastChapter != null ? lastChapter.Id + 1 : 100;
            context.Chapters.InsertOne(Chapter);
            return Chapter;
        }

        public bool DeleteChapter(int ChapterId)
        {
            context.Chapters.DeleteOne(u => u.Id == ChapterId);
            return true;
        }

        public List<Chapter> GetAllChapters()
        {
            return context.Chapters.Find(_ => true).ToList();
        }

        public Chapter GetChapterById(int ChapterId)
        {
            return context.Chapters.Find(u => u.Id == ChapterId).FirstOrDefault();
        }


        public bool UpdateChapter(int ChapterId, Chapter Chapter)
        {
            context.Chapters.ReplaceOne(m => m.Id == ChapterId, Chapter);
            return true;
        }
    }
}
