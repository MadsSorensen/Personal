using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace ChatAPI.Attributes
{
    public class CustomSignalRAuthorize : Microsoft.AspNet.SignalR.AuthorizeAttribute
    {
        public override bool AuthorizeHubConnection(HubDescriptor hubDescriptor, IRequest request)
        {
            var result = request.User.Identity.IsAuthenticated;
            return base.AuthorizeHubConnection(hubDescriptor, request);
        }
        public override bool AuthorizeHubMethodInvocation(IHubIncomingInvokerContext hubIncomingInvokerContext, bool appliesToMethod)
        {
            var context = hubIncomingInvokerContext.Hub.Context;
            if ((bool?)!context.User?.Identity?.IsAuthenticated ?? true)
            {
                var result = hubIncomingInvokerContext.Hub.Clients.Client(context.ConnectionId);
                result.notAuthenticated();
            }
            return base.AuthorizeHubMethodInvocation(hubIncomingInvokerContext, appliesToMethod);   
        }
    }
}