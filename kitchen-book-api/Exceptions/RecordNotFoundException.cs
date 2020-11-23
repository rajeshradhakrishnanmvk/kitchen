using System;


namespace kitchen_api_book.Exceptions
{
    public class RecordNotFoundException : ApplicationException
    {
        public RecordNotFoundException() { }
        public RecordNotFoundException(string message) : base(message) { }
    }
}
