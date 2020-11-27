namespace Skribbl.Models
{
    public class Player
    {
        private string _connectionId;
        private string _name;
        private bool _turn;
        private bool _played;
        private int _score;
        private string _word;

        public Player(string connectionId, string name)
        {
            _connectionId = connectionId;
            _name = name;

        }
    }
}