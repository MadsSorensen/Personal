using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ChatAPI.Controllers
{
    public class BaseController : ApiController
    {
        public DatabaseLibrary.DataClassesDataContext DB { get; set; }
        public BaseController()
        {
            DB = new DatabaseLibrary.DataClassesDataContext();
        }
    }
}
