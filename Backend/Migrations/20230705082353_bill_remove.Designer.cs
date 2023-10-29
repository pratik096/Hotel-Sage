﻿// <auto-generated />
using System;
using HotelManagementApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HotelManagementApi.Migrations
{
    [DbContext(typeof(ApiDbContext))]
    [Migration("20230705082353_bill_remove")]
    partial class bill_remove
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("HotelManagementApi.Models.Booking", b =>
                {
                    b.Property<int>("Book_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Book_Id"));

                    b.Property<DateTime>("Booking_date")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Check_in_date")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Check_out_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("Guest_ID")
                        .HasColumnType("int");

                    b.Property<int>("Room_ID")
                        .HasColumnType("int");

                    b.Property<string>("Room_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("total_amount")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("total_days")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Book_Id");

                    b.HasIndex("Guest_ID");

                    b.HasIndex("Room_ID");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("HotelManagementApi.Models.Role", b =>
                {
                    b.Property<int>("Role_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Role_ID"));

                    b.Property<string>("Role_Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Role_ID");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("HotelManagementApi.Models.Room", b =>
                {
                    b.Property<int>("Room_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Room_Id"));

                    b.Property<string>("ImageUrls")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Room_Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Room_description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Room_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Room_price")
                        .HasColumnType("int");

                    b.Property<int>("Total_People")
                        .HasColumnType("int");

                    b.HasKey("Room_Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("HotelManagementApi.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DOB")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mobile")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role_ID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Role_ID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("HotelManagementApi.Models.Booking", b =>
                {
                    b.HasOne("HotelManagementApi.Models.User", "User")
                        .WithMany("Bookings")
                        .HasForeignKey("Guest_ID")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("HotelManagementApi.Models.Room", "Room")
                        .WithMany("Bookings")
                        .HasForeignKey("Room_ID")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HotelManagementApi.Models.User", b =>
                {
                    b.HasOne("HotelManagementApi.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("Role_ID")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("HotelManagementApi.Models.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("HotelManagementApi.Models.Room", b =>
                {
                    b.Navigation("Bookings");
                });

            modelBuilder.Entity("HotelManagementApi.Models.User", b =>
                {
                    b.Navigation("Bookings");
                });
#pragma warning restore 612, 618
        }
    }
}
