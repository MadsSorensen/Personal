using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ChatAPI.Controllers
{
    [RoutePrefix("api/Chat")]
    public class ChatController : ApiController
    {
        [Route("Test")]
        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult Test([FromBody]string name)
        {
            return Ok();
        }
        [Route("Test2")]
        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult Test2()
        {
            return Ok("Yo");
        }
    }
}
