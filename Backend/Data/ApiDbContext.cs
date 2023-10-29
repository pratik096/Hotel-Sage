using HotelManagementApi.Models;
//using HotelManagementApi.Models.DbModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;


namespace HotelManagementApi.Data
{
    public class ApiDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Booking> Bookings { get; set; }

        public DbSet<Room> Rooms { get; set; }

        public DbSet<Role> Roles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=HotelManagementDb2;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Role to User (1:N)
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(p => p.Users)
                .HasForeignKey(p => p.Role_ID)
                .OnDelete(DeleteBehavior.NoAction);

            // User to Booking (1:N)
            modelBuilder.Entity<Booking>()
                .HasOne(u => u.User)
                .WithMany(p => p.Bookings)
                .HasForeignKey(u => u.Guest_ID)
                .OnDelete(DeleteBehavior.NoAction);

            //  Room to Booking(1:N)
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Room)
                .WithMany(r => r.Bookings)
                .HasForeignKey(b => b.Room_ID)
                .OnDelete(DeleteBehavior.NoAction);

           
              
        }

    }
}














/* Bill to Booking  (1:1)
            modelBuilder.Entity<Bill>()
                .HasOne(u => u.Booking)
                .WithOne(p => p.Bill)
                .HasForeignKey<Booking>(p => p.book_ID)
                .HasPrincipalKey<Bill>(u => u.Bill_ID)
                .OnDelete(DeleteBehavior.NoAction);
            */





/*Room_Category to Room(1:N)
           modelBuilder.Entity<Room>()
               .HasOne(u => u.Room_Category)
               .WithMany(p => p.Rooms)
               .HasForeignKey(u => u.category_ID)
               .OnDelete(DeleteBehavior.NoAction);*/