using HotelManagementApi.Data;
using HotelManagementApi.Models;
using HotelManagementApi.Models.UpdateModel;
using HotelManagementApi.Models.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace HotelManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        ApiDbContext _dbContext = new ApiDbContext();

        private ViewRoom _viewroom;

        public RoomsController()
        {
            var context = new ApiDbContext();
            _viewroom = new ViewRoom(context);
        }

        [HttpGet("RoomList")]
        //[Authorize(Roles = "Admin,Customer")]
        public IActionResult GetRoom()
        {
            var subcategories = _dbContext.Rooms.Include(r => r.Bookings).ToList(); ;
            //var options = new JsonSerializerOptions
            //{
            //    ReferenceHandler = ReferenceHandler.Preserve
            //};
            //string json = JsonSerializer.Serialize(subcategories, options);
            return Ok(subcategories);
        }

       
        [HttpGet("RoomDetailById")]
        //[Authorize(Roles = "Admin,Customer")]
        public IActionResult GetRoomDetail(int room_Id)
        {
            var roomResult = _dbContext.Rooms.FirstOrDefault(p => p.Room_Id == room_Id);
            if (roomResult == null)
            {
                return NotFound();
            }
            return Ok(roomResult);
        }


        //GetRoomWithBookings
        [HttpGet("RoomWithBookings/{roomId}")]
        //[Authorize(Roles = "Admin")]
        public IActionResult GetRoomWithBookings(int roomId)
        {
            var roomResult = _dbContext.Rooms
                .Include(r => r.Bookings)
                .FirstOrDefault(r => r.Room_Id == roomId);

            if (roomResult == null)
            {
                return NotFound("Invalid Room ID");
            }

            return Ok(roomResult);
        }


        //AddBookingToRoom
        [HttpPost("{roomId}/AddBooking")]
        //[Authorize(Roles = "Admin")]
        public IActionResult AddBookingToRoom(int roomId, Booking booking)
        {
            var room = _dbContext.Rooms.FirstOrDefault(r => r.Room_Id == roomId);
            if (room == null)
            {
                return NotFound("Invalid Room ID");
            }

            booking.Room_ID = roomId;
            _dbContext.Bookings.Add(booking);
            _dbContext.SaveChanges();

            return StatusCode(StatusCodes.Status201Created);
        }



        [HttpPost("AddRoom")]
        //[Authorize(Roles = "Admin")]
        public IActionResult Post(Room room)
        {
            _dbContext.Rooms.Add(room);
            _dbContext.SaveChanges();
            return StatusCode(StatusCodes.Status201Created);
        }



        [HttpPut("UpdateRoomByID")]
        //[Authorize(Roles = "Admin")]
        public IActionResult Put(int room_id, [FromBody] UpdateRoom updateroom)
        {
            var roomResult = _dbContext.Rooms.FirstOrDefault(p => p.Room_Id == room_id);
            if (roomResult == null)
            {
                return NotFound("Invalid Room Id");
            }
            else
            {
                roomResult.Room_name = updateroom.Room_name;
                roomResult.Room_price = updateroom.Room_price;
                //roomResult.number_of_rooms = updateroom.number_of_rooms;
                //roomResult.category_ID = updateroom.category_ID;

                _dbContext.SaveChanges();
                return Ok("Record Updated Successfully");
            }
        }



        [HttpDelete("DeleteRoom")]
        //[Authorize(Roles = "Admin")]

        public IActionResult Delete(int id)
        {
            var roomResult = _dbContext.Rooms.FirstOrDefault(p => p.Room_Id == id);
            if (roomResult == null)
            {
                return NotFound("Invalid Room ID");
            }
            else
            {
                _dbContext.Rooms.Remove(roomResult);
                _dbContext.SaveChanges();
                return Ok("Record Deleted Successfully");
            }
                return BadRequest();
        }
        
    }
    
}




