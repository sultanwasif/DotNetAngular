using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TESTAPI.Data;
using TESTAPI.DTOs;
using TESTAPI.Entities;
using TESTAPI.Interface;

namespace TESTAPI.Controllers
{
    public class AccountController : BaseController
    {
        public DataContext _context ;
        public ITokenService _tokenService { get; set; }

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]

        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerdto) {
            
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

            return new UserDTO
            {
                Username = user.UserName,
                Token = _tokenService.Createtoken(user)
            };

        }

        private async Task<bool> Userexist(string username) {
            return await _context.Users.AnyAsync(x=> x.UserName == username.ToLower());
        }

        [HttpPost("login")]

        public async Task<ActionResult<UserDTO>> login(LoginDTO logindto) {
        var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == logindto.Username);
        if( user == null) return Unauthorized("Invalid Username");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computehashed = hmac.ComputeHash(Encoding.UTF8.GetBytes(logindto.Password));

        for(int i = 0; i < computehashed.Length; i++ ) {
            if(computehashed[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
        }

        return new UserDTO
            {
                Username = user.UserName,
                Token = _tokenService.Createtoken(user)
            };

        }

    }
}