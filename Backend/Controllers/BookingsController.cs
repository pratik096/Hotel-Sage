using HotelManagementApi.Data;
using HotelManagementApi.Models.UpdateModel;
using HotelManagementApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        ApiDbContext _dbContext = new ApiDbContext();
       

        [HttpGet("BookingDetails")]
        //[Authorize(Roles = "Admin")]
        public IActionResult GetBooking()
        {
            var bookdetails = _dbContext.Bookings;
            return Ok(bookdetails);
        }


        [HttpGet("BookingDetailsByID")]
        //[Authorize(Roles = "Admin,Customer")]
        //[Authorize]
        public IActionResult GetBooking(int book_ID)
        {
            var bookResult = _dbContext.Bookings.Where(c => c.Book_Id == book_ID);
            if (bookResult == null)
            {
                return NotFound();
            }
            return Ok(bookResult);
        }

        [HttpGet("BookingDetailsByCustomerID")]
        //[Authorize(Roles = "Admin,Customer")]
        //[Authorize]
        public IActionResult GetCustomerDetails(int cust_ID)
        {
            var custResult = _dbContext.Bookings.Where(c => c.Guest_ID == cust_ID);
            if (custResult == null)
            {
                return NotFound();
            }
            return Ok(custResult);
        }



        [HttpPost("AddBooking")]
        //[Authorize(Roles = "Admin,Customer")]
        public IActionResult Post([FromBody] Booking booking)
        {
            _dbContext.Bookings.Add(booking);
            _dbContext.SaveChanges();
            return Ok("Booking Created Successfully");
        }



        [HttpDelete("DeleteBooking")]
        //[Authorize(Roles = "Admin,Customer")]

        public IActionResult Delete(int id)
        {
            var bookResult = _dbContext.Bookings.FirstOrDefault(p => p.Book_Id == id);
            if (bookResult == null)
            {
                return NotFound("Invalid Room ID");
            }
            else
            {
                _dbContext.Bookings.Remove(bookResult);
                _dbContext.SaveChanges();
                return Ok("Record Deleted Successfully");
            }
            return BadRequest();
        }

    }
}




        