//using HotelManagementApi.Models.DbModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HotelManagementApi.Models
{
    public class Booking
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Book_Id { get; set; }

        [Required]
        public DateTime Check_in_date { get; set; }

        [Required]
        public DateTime Check_out_date { get; set; }

        [Required]
        public DateTime Booking_date { get; set; } = DateTime.Now;

        [Required]
        public string total_amount{ get; set; }

        [Required]
        public string total_days { get; set; }


        [Required]
        public string status { get; set; } = "booked";

        //foreign key to user table and room table
        [Required]
        public int Guest_ID { get; set; }

        [Required]
        public int Room_ID { get; set; }

        [Required]
        public string Room_name { get; set; }


        //Navigation properties of child/parent tables (here user,room,bill Table)
        [JsonIgnore]
        public User User { get; set; }

        [JsonIgnore]
        public Room Room { get; set; }

    }
}
