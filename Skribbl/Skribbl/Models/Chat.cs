namespace Skribbl.Models
{
    using System;
    using System.Text.Json;
    using System.Collections.Generic;

    public class Chat
    {
        private List<Message> messages;
        private string guessedWord;
        private string word;

        public Chat(string word)
        {
            messages = new List<Message>();
            this.word = word;
        }

        internal void AddMessage(string message, string connectionId)
        {
            if(message.Equals(word))
            {
                messages.Add(new Message(connectionId, message));
            } else
            {
                messages.Add(new Message(connectionId, $" guessed the word!"));
            }
        }
    }
}