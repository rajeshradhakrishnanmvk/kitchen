using System;
using MongoDB.Bson.Serialization.Attributes;
namespace kitchen_api_chapter.Models
{
    public class Chapter
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Duration { get; set; }
        public int SeqNo { get; set; }
        public Book Book { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreationDate { get; set; }
    }
}