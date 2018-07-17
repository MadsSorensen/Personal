using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace AngularChatRoom
{
    public class ChatHub : Hub
    {
        static Dictionary<string, string> users = new Dictionary<string, string>();
        public void Send(string name, string message)
        {
            Clients.All.recieveMessage(name, message);
        }
        public void Register(string name)
        {
            var connectionID = Context.ConnectionId;
            var userName = name;
            if (!users.ContainsKey(connectionID))
            {
                users.Add(connectionID, userName);
                Clients.All.newClient(name);
            }
        }
        public override Task OnDisconnected(bool stopCalled)
        {
            var user = users.FirstOrDefault(x => x.Key == Context.ConnectionId);
            users.Remove(Context.ConnectionId);
            Clients.All.clientLeft(user.Value);
            return base.OnDisconnected(stopCalled);
        }
    }
}