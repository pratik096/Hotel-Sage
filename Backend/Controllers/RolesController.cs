using HotelManagementApi.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        ApiDbContext _dbContext = new ApiDbContext();


        [HttpGet("GetRoleDetails")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetRole()
        {
            var rolelist = _dbContext.Roles;
            return Ok(rolelist);
        }
    }
}
