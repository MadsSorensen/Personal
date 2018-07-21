using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChatAPI.Helpers
{
    public class CryptoHelper : SimpleCrypto.PBKDF2
    {
        public CryptoHelper()
        {
            HashIterations = 10000;
        }
    }
}