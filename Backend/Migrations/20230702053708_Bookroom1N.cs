using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class Bookroom1N : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookingRoom");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_Room_ID",
                table: "Bookings",
                column: "Room_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Rooms_Room_ID",
                table: "Bookings",
                column: "Room_ID",
                principalTable: "Rooms",
                principalColumn: "Room_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Rooms_Room_ID",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_Room_ID",
                table: "Bookings");

            migrationBuilder.CreateTable(
                name: "BookingRoom",
                columns: table => new
                {
                    BookingId = table.Column<int>(type: "int", nullable: false),
                    RoomId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingRoom", x => new { x.BookingId, x.RoomId });
                    table.ForeignKey(
                        name: "FK_BookingRoom_Bookings_BookingId",
                        column: x => x.BookingId,
                        principalTable: "Bookings",
                        principalColumn: "Book_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookingRoom_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Room_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookingRoom_RoomId",
                table: "BookingRoom",
                column: "RoomId");
        }
    }
}
