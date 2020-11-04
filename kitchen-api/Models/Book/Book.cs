using System;
namespace kitchen_api.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string IconUrl { get; set; }
        public string BookListIcon { get; set; }
        public string BookLongDescription { get; set; }
        public string Category { get; set; }
        public int ChapterCount { get; set; }
        public DateTime ReleasedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreationDate { get; set; }
    }
}