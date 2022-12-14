using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Threading.Tasks;

namespace TESTAPI.DTOs
{
    public class LoginDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}