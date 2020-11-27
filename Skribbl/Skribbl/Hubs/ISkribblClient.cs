namespace Skribbl.Hubs
{
    using System.Threading.Tasks;

    public interface ISkribblClient
    {
        Task ReceiveMessage(string chat);
        Task ReceiveGame(string game);
    }
}
