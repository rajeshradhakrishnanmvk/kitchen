using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using kitchen_api_book.Service;
using kitchen_api_book.Models;
using kitchen_api_book.Extensions;

namespace kitchen_api_book.Controllers
{

    [Authorize("ApiUser")]
    [ExceptionHandler]
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        private readonly IBookService service;
        private readonly ILogger _logger;
        public BookController(IBookService _service, ILogger<BookController> logger)
        {
            this.service = _service;
            this._logger = logger;
        }
        // GET: api/<controller>
        [HttpGet]
        public IActionResult Get()
        {
            string Message = $"Book API GET visited at {DateTime.UtcNow.ToLongTimeString()}";
            _logger.LogInformation(Message);
            return Ok(new { payload = service.GetBooks() });
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
             string Message = $"Book API GET with id visited at {DateTime.UtcNow.ToLongTimeString()}";
            _logger.LogInformation(Message);
            return Ok(service.GetBookById(id));
        }


        // POST api/<controller>
        [HttpPost]
        public IActionResult Post([FromBody] Book value)
        {
            string Message = $"Book API GET with id visited at {DateTime.UtcNow.ToLongTimeString()}";
            _logger.LogInformation(Message);
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
