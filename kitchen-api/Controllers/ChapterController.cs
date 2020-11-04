using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using kitchen_api.Service;
using kitchen_api.Models;
using kitchen_api.Extensions;


namespace kitchen_api.Controllers
{

    //[Authorize]
    [ExceptionHandler]
    [Route("api/[controller]")]
    public class ChapterController : Controller
    {
        private readonly IChapterService service;

        public ChapterController(IChapterService _service)
        {
            this.service = _service;
        }

        // GET: api/<controller>
        [HttpGet()]
        public IActionResult Get()
        {
            return Ok(service.GetChapter());
        }
        [HttpGet("GetChapter")]
        public IActionResult GetChapter(int bookId, string filter, string sortOrder, int pageNumber, int pageSize)
        {
            List<Chapter> Chapters = service.GetChapter().Where(b => b.Book.Id == bookId).ToList();
            if (!String.IsNullOrEmpty(filter))
            {
                Chapters = Chapters.Where(s => s.Description.Contains(filter)
                                    || s.Description.Contains(filter)).ToList();
            }
            switch (sortOrder)
            {
                case "desc":
                    Chapters = Chapters.OrderByDescending(s => s.Id).ToList();
                    break;
                case "asc":
                    Chapters = Chapters.OrderBy(s => s.Id).ToList();
                    break;
                default:
                    Chapters = Chapters.OrderBy(s => s.Id).ToList();
                    break;
            }
            int initialPos = pageNumber * pageSize;
            return Ok(new { payload = Chapters.Skip(initialPos).Take(initialPos + pageSize) });
        }
        // GET: api/<controller>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(service.GetChapterById(id));
        }


        // POST api/<controller>
        [HttpPost]
        public IActionResult Post([FromBody] Chapter value)
        {
            Chapter ChapterResult = service.CreateChapter(value);
            return Created("", ChapterResult);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Chapter value)
        {
            service.UpdateChapter(id, value);
            return Ok(value);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(service.DeleteChapter(id));
        }
    }
}
