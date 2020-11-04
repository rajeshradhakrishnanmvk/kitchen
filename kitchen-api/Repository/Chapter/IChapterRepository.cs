using System.Collections.Generic;
using kitchen_api.Models;

namespace kitchen_api.Repository
{
    public interface IChapterRepository
    {
        Chapter CreateChapter(Chapter Chapter);
        bool DeleteChapter(int ChapterId);
        bool UpdateChapter(int ChapterId, Chapter Chapter);
        Chapter GetChapterById(int ChapterId);
        List<Chapter> GetAllChapters();
    }
}
