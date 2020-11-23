using System;


namespace kitchen_api_chapter.Exceptions
{
    public class RecordNotCreatedException : ApplicationException
    {
        public RecordNotCreatedException() { }
        public RecordNotCreatedException(string message) : base(message) { }
    }
}
