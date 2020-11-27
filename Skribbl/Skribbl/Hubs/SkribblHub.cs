namespace Skribbl.Hubs
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.SignalR;
    using Newtonsoft.Json;
    using Skribbl.Models;

    public class SkribblHub: Hub<ISkribblClient>
    {
        Dictionary<string, Game> games = new Dictionary<string, Game>();

        [HubMethodName("SendMessageToGroup")]
        public async Task SendClientMessageToGroup(string gameId, string message)
        {
            if(!games.ContainsKey(gameId))
            {
                games[gameId] = new Game(Context.ConnectionId, "");
            }
            games[gameId].SendMessage(message, Context.ConnectionId);
            await Clients.All.ReceiveMessage(JsonConvert.SerializeObject(games[gameId].chat));
        }

        [HubMethodName("CreateNewGame")]
        public async Task NewGame(string name)
        {
            Game game = new Game(Context.ConnectionId, name);
            games.Add(game.gameId, game);
            await Clients.All.ReceiveGame(JsonConvert.SerializeObject(games[game.gameId]));
        }

        [HubMethodName("JoinGame")]
        public async Task JoinGame(string gameId, string name)
        {
            games[gameId].AddPlayer(name, Context.ConnectionId);
            await Clients.All.ReceiveGame(JsonConvert.SerializeObject(games[gameId]));
        }
    }
}
