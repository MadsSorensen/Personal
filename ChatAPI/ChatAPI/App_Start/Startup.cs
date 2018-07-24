using System;
using System.Threading.Tasks;
using System.Web.Http;
using ChatAPI.Authentication;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Owin;

[assembly: OwinStartup(typeof(ChatAPI.App_Start.Startup))]

namespace ChatAPI.App_Start
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            ConfigureOAuth(app);
            WebApiConfig.Register(config);
            app.UseWebApi(config);
        }
        public void ConfigureOAuth(IAppBuilder app)
        {
            OAuthAuthorizationServerOptions oAuthAuthorizationServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/authtoken"),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(60),
                Provider = new AuthorizationProvider()
            };
            app.UseOAuthAuthorizationServer(oAuthAuthorizationServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            app.Map("/signalr", x =>
            {
                x.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions()
                {
                    
                    Provider = new QueryStringAuthorizationProvider()
                });
                var hubConfig = new HubConfiguration()
                {
                    EnableDetailedErrors = true,
                    Resolver = GlobalHost.DependencyResolver
                };
                x.RunSignalR();
            });
            app.MapSignalR();
        }
    }
}
