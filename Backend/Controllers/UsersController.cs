using HotelManagementApi.Data;
using HotelManagementApi.Models;
using HotelManagementApi.Models.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HotelManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        ApiDbContext _dbContext = new ApiDbContext();


        //Injecting IConfiguration to access all settings from appsettings.json

        private IConfiguration _config;

        public UsersController(IConfiguration config)
        {
            _config = config;
        }


        [HttpGet("GetUserDetails")]
        //[Authorize(Roles = "Admin")]
        public IActionResult GetUser()
        {
            var userlist = _dbContext.Users;
            return Ok(userlist);
        }


        [HttpPost("[action]")]
        public IActionResult Register([FromBody] User user)
        {
            var userExists = _dbContext.Users.FirstOrDefault(u => u.Email == user.Email);
            if (userExists != null)
            {
                return BadRequest("User with same email already exists!!");
            }
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            // Return a custom success message
            return Ok("User registered successfully!");
        }


        //Generating Json Web Token

        [HttpPost("[action]")]
        public IActionResult Login([FromBody] Login user)
        {
            var currentUser = _dbContext.Users.FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password);
            if (currentUser == null)
            {
                return NotFound();
            }
            var role = _dbContext.Roles.Find(currentUser.Role_ID);
            //Symmetric Key is used to encrypt and decrypt the data

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, currentUser.Name),
                new Claim(ClaimTypes.Role, role.Role_Name ),
                new Claim(ClaimTypes.NameIdentifier, currentUser.Id.ToString())

            };

            var token = new JwtSecurityToken(
                issuer: _config["JWT:Issuer"],
                audience: _config["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(jwt);

        }


    
    }

}

