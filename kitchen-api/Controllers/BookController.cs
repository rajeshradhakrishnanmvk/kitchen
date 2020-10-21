using Microsoft.AspNetCore.Mvc;
using kitchen_api.Service;
using kitchen_api.Models;
using kitchen_api.Extensions;
using Microsoft.AspNetCore.Authorization;


namespace kitchen_api.Controllers
{

    //[Authorize]
    [ExceptionHandler]
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private readonly IBookService service;

        public BookController(IBookService _service)
        {
            this.service = _service;
        }
        // GET: api/<controller>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { payload = service.GetBooks() });
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(service.GetBookById(id));
        }


        // POST api/<controller>
        [HttpPost]
        public IActionResult Post([FromBody] Book value)
        {
            Book BookResult = service.CreateBook(value);
            return Created("", BookResult);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Book value)
        {
            service.UpdateBook(id, value);
            return Ok(value);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(service.DeleteBook(id));
        }
    }
}
