using HotelManagementApi.Data;
using Microsoft.EntityFrameworkCore;

namespace HotelManagementApi.Models.ViewModel
{



    public class ViewRoom
    {
        private ApiDbContext _context;


        public ViewRoom(ApiDbContext context)
        {
            _context = context;
        }



        public string Room_name { get; set; }

        public int Total_People { get; set; }


        public int Room_price { get; set; }


        public string ImageUrls { get; set; }


        public string Room_Type { get; set; }


        public string Room_description { get; set; }
    }

}