using System.Collections.Generic;
using kitchen_api_chapter.Models;

namespace kitchen_api_chapter.Repository
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
