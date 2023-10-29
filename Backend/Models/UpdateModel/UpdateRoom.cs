namespace HotelManagementApi.Models.UpdateModel
{
    public class UpdateRoom
    {


        public string Room_name { get; set; }

        
        public int Total_People { get; set; }

        
        public int Room_price { get; set; }

        
        public List<string> ImageUrls { get; set; }

       
        public string Room_description { get; set; }

        
        public string Room_Type { get; set; }
    }
}
