using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HotelManagementApi.Models
{
    public class Role
    {
        [Key] 
        public int Role_ID { get; set; }

        [Required]
        public string Role_Name { get; set;}


        //Navigation properties of child/parent tables (here User Table)
        [JsonIgnore]
        public virtual ICollection<User> Users { get; set; }
    }
}
