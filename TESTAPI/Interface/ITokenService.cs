using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TESTAPI.Entities;

namespace TESTAPI.Interface
{
    public interface ITokenService
    {
        string Createtoken(AppUser appUser);
    }
}