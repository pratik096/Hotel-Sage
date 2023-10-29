import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";

const Bookings = () => {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await (
          await axios.get("https://localhost:7009/api/Bookings/BookingDetails")
        ).data;
        setbookings(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h1>Bookings</h1>
          {loading && <Loader />}
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Booking Id</th>
                <th scope="col">User Id</th>
                <th scope="col">Room</th>
                <th scope="col">Check-in Date</th>
                <th scope="col">Check-out Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
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
                    <tr>
                      <td scope="row">{booking.book_Id}</td>
                      <td>{booking.guest_ID}</td>
                      <td>{booking.room_name}</td>
                      <td>{checkInDate}</td>
                      <td>{checkOutDate}</td>
                      <td>{booking.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Bookings;
