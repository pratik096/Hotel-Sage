//using HotelManagementApi.Models.DbModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HotelManagementApi.Models
{
    public class Room
    {
        [Key]
        public int Room_Id { get; set; }

        [Required]
        public string Room_name { get; set; }

        [Required]
        public int Total_People { get; set; }

        [Required]
        public int Room_price { get; set; }

        [Required]
        public string ImageUrls { get; set; }


        [Required]
        public string Room_Type { get; set; }

        [Required]
        public string Room_description { get; set; }


        //[JsonIgnore]
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}



























//Room_Categories
/*using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HotelManagementApi.Models.DbModel
{
    public class Room_Category
    {
        
            [Key]
            public int category_Id { get; set; }

            [Required]
            public string category_name { get; set; }

            /*[Required]
            public int Total_People{ get; set; }

            [Required]
            public int category_price { get; set; }

            [Required]
            public List<string> ImageUrls { get; set; }

            [Required]
            public string category_description { get; set; }



             //Navigation properties of child/parent tables (here RoomsTable)
            [JsonIgnore]
            public virtual ICollection<Room> Rooms { get; set; }
    }
}
*/

