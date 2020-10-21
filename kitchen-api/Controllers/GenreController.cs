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
    public class GenreController : Controller
    {
        private readonly IGenreService service;

        public GenreController(IGenreService _service)
        {
            this.service = _service;
        }

        // GET: api/<controller>
        [HttpGet()]
        public IActionResult Get()
        {
            return Ok(service.GetGenre());
        }
        [HttpGet("GetGenre")]
        public IActionResult GetGenre(int bookId, string filter, string sortOrder, int pageNumber, int pageSize)
        {
            List<Genre> genres = service.GetGenre().Where(b => b.Book.Id == bookId).ToList();
            if (!String.IsNullOrEmpty(filter))
            {
                genres = genres.Where(s => s.Description.Contains(filter)
                                    || s.Description.Contains(filter)).ToList();
            }
            switch (sortOrder)
            {
                case "desc":
                    genres = genres.OrderByDescending(s => s.Id).ToList();
                    break;
                case "asc":
                    genres = genres.OrderBy(s => s.Id).ToList();
                    break;
                default:
                    genres = genres.OrderBy(s => s.Id).ToList();
                    break;
            }
            int initialPos = pageNumber * pageSize;
            return Ok(new { payload = genres.Skip(initialPos).Take(initialPos + pageSize) });
        }
        // GET: api/<controller>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(service.GetGenreById(id));
        }


        // POST api/<controller>
        [HttpPost]
        public IActionResult Post([FromBody] Genre value)
        {
            Genre GenreResult = service.CreateGenre(value);
            return Created("", GenreResult);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Genre value)
        {
            service.UpdateGenre(id, value);
            return Ok(value);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(service.DeleteGenre(id));
        }
    }
}
