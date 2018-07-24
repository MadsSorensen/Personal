using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using ChatAPI.Attributes;
using Microsoft.AspNet.SignalR;

namespace ChatAPI
{
    public class chatHub : Hub
    {
        [CustomSignalRAuthorize]
        public void Register(string name)
        {
            var context = Context;
            Clients.All.recieveRegistration(name);
        }
    }
}