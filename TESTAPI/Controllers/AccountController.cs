using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TESTAPI.Data;
using TESTAPI.DTOs;
using TESTAPI.Entities;

namespace TESTAPI.Controllers
{
    public class AccountController : BaseController
    {
        public DataContext _context ;
        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("register")]

        public async Task<ActionResult<AppUser>> Register(RegisterDTO registerdto) {
            
            if (await Userexist(registerdto.Username)) return BadRequest("User Already Exist");
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerdto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerdto.Password)),
                PasswordSalt = hmac.Key
                
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;

        }

        private async Task<bool> Userexist(string username) {
            return await _context.Users.AnyAsync(x=> x.UserName == username.ToLower());
        }

    }
}