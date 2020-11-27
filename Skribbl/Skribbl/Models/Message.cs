namespace Skribbl.Models
{
    public class Message
    {
        string sender;
        string message;
        private string connectionId;

        public Message(string connectionId, string message)
        {
            this.connectionId = connectionId;
            this.message = message;
        }
    }
}