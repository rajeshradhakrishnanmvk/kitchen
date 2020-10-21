using System;


namespace kitchen_api.Exceptions
{
    public class RecordNotCreatedException : ApplicationException
    {
        public RecordNotCreatedException() { }
        public RecordNotCreatedException(string message) : base(message) { }
    }
}
