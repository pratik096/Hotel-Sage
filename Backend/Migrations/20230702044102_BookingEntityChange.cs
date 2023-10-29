using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class BookingEntityChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Booking_Date",
                table: "Bookings",
                newName: "Booking_date");

            migrationBuilder.AddColumn<string>(
                name: "status",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "total_amount",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "total_days",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "status",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "total_amount",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "total_days",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "Booking_date",
                table: "Bookings",
                newName: "Booking_Date");
        }
    }
}
