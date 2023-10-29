import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Loader from "./Loader";
import Error from "./Error";
import swal from "sweetalert2";
import { Tabs, Divider, Tag } from "antd";

function MyBookings({ uid }) {
  // const [userid, setuserid] = useState("");
  const [bookings, setbookings] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  console.log(uid);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        if (uid) {
          const { data: book } = await axios.get(
            `https://localhost:7009/api/Bookings/BookingDetailsByCustomerID?cust_ID=${uid}`
          );
          console.log(book);
          setbookings(book);
          setloading(false);
        }
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    };
    fetchData();
  }, []);

  async function cancelBooking(bookingid) {
    try {
      setloading(true);
      const result = await axios.delete(
        `https://localhost:7009/api/Bookings/DeleteBooking?id=${bookingid}`
      ).data;
      console.log(result);
      setloading(false);
      swal
        .fire("Congrats", "Your booking has been cancelled", "Success")
        .then((result) => {
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
      setloading(false);
      swal.fire("oopps", "Something went wrong", "error");
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              console.log(booking.room_ID);
              const checkInDate = new Date(
                booking.check_in_date
              ).toLocaleDateString("en-GB");
              const checkOutDate = new Date(
                booking.check_out_date
              ).toLocaleDateString("en-GB");
              return (
                <div className="bs ">
                  <h1>{booking.room_name}</h1>
                  <p>
                    <b>Booking ID </b>: {booking.book_Id}
                  </p>
                  <p>
                    <b>Check-in Date</b> : {checkInDate}
                  </p>
                  <p>
                    <b>Check-out Date </b>: {checkOutDate}
                  </p>
                  <p>
                    <b>Amount</b>: {booking.total_amount}
                  </p>
                  <p>
                    <b>Room ID </b>: {booking.room_ID}
                  </p>
                  <p>
                    <b>Status</b> :
                    {booking.status === "booked" ? (
                      <Tag color="green"> CONFIRMED </Tag>
                    ) : (
                      <Tag color="red"> CANCELLED </Tag>
                    )}
                  </p>

                  <div className="text-right">
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        cancelBooking(booking.book_Id);
                      }}
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );

}

export default MyBookings;

