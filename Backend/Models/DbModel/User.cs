using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HotelManagementApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Mobile { get; set; }

        [Required]
        public DateTime DOB { get; set; }

        [Required]
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }


        //foreign key to role table
        [Required]
        public int Role_ID { get; set; } = 2;


        //Navigation properties of child/parent tables (here Booking Table)

        [JsonIgnore]
        public Role Role { get; set; }

        [JsonIgnore]
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}
