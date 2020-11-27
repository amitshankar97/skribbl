namespace Skribbl.Models
{
    using System;
    using System.Collections.Generic;
    using Skribbl.Services;

    public class Game
    {
        public string gameId { get; }
        public List<Player> players;
        public Chat chat { get; }
        private string word;
        WordGenerator wordGenerator = new WordGenerator();
        public string errorMessage;

        public Game(string connectionId, string name)
        {
            try
            {
                gameId = Guid.NewGuid().ToString();
                players = new List<Player>
                {
                    new Player(connectionId, name)
                };
                word = wordGenerator.GetNewWord();
                chat = new Chat(word);
                errorMessage = "";
            }
            catch(Exception e)
            {
                errorMessage = e.Message;
            }
        }

        internal void SendMessage(string message, string connectionId)
        {
            chat.AddMessage(message, connectionId);
        }

        internal void AddPlayer(string name, string connectionId)
        {
            players.Add(new Player(connectionId, name));
        }
    }
}
