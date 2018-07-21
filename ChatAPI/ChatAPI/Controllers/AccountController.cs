using ChatAPI.Helpers;
using ChatAPI.Models;
using DatabaseLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ChatAPI.Controllers
{
    public class AccountController : BaseController
    {
        [AllowAnonymous]
        [HttpPost]
        public IHttpActionResult Signup(SignupModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                var user = DB.Users.FirstOrDefault(x => x.Username == model.UserName);
                if (user != null)
                {
                    return BadRequest("User with that username already exists!");
                }
                else
                {
                    var crypto = new CryptoHelper();
                    var hashedPassword = crypto.Compute(model.Password);
                    user = new User()
                    {
                        Username = model.UserName,
                        Name = model.Name,
                        PasswordHash = hashedPassword,
                        PasswordSalt = crypto.Salt,
                    };
                    DB.Users.InsertOnSubmit(user);
                    DB.SubmitChanges();
                }
                return Ok(user);
            }
        }
    }
}
