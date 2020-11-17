using kitchen_api_chapter.Models;
using System.Collections.Generic;

namespace kitchen_api_chapter.Service
{
    public interface IChapterService
    {
        Chapter CreateChapter(Chapter Chapter);
        bool DeleteChapter(int ChapterId);
        bool UpdateChapter(int ChapterId, Chapter Chapter);
        Chapter GetChapterById(int ChapterId);
        List<Chapter> GetChapter();

    }
}
