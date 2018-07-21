using ChatAPI.Helpers;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace ChatAPI.Authentication
{
    public class AuthorizationProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var db = new DatabaseLibrary.DataClassesDataContext();
            var crypto = new CryptoHelper();
            var username = context.UserName;
            var password = context.Password;
            var user = db.Users.FirstOrDefault(x => x.Username == username);
            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
            }
            else if (user.PasswordHash != crypto.Compute(password, user.PasswordSalt))
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
            }
            else
            {
                context.Validated(new ClaimsIdentity(context.Options.AuthenticationType));
            }
        }
    }
}