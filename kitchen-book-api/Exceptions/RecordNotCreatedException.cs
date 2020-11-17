using System;


namespace kitchen_api_book.Exceptions
{
    public class RecordNotCreatedException : ApplicationException
    {
        public RecordNotCreatedException() { }
        public RecordNotCreatedException(string message) : base(message) { }
    }
}
