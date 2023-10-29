import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import "moment-timezone";
import jwt_decode from "jwt-decode";
import swal from "sweetalert2";

function BookingScreen() {
  const { roomid, fromdate, todate } = useParams();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState(null);
  const [userid, setuserid] = useState("");
  const [decodename, setdecodename] = useState();

  const firstdate = moment.utc(fromdate, "DD-MM-YYYY");
  const formattedfirstDate = firstdate.format("M/D/YYYY h:mm:ss A");
  //console.log(formattedfirstDate);
  const lastdate = moment.utc(todate, "DD-MM-YYYY");
  const formattedlastDate = lastdate.format("M/D/YYYY h:mm:ss A");
  //console.log(formattedlastDate);
  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1;
  //console.log(totaldays)

  useEffect(() => {
    const token = localStorage.getItem("token");
    //console.log(token);
    if (token) {
      const decodedToken = jwt_decode(token);
      //console.log(decodedToken)
      const decodedUsername =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];
      //console.log(decodedUsername);
      const decodedUserId =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      //console.log(decodedUserId)
      const intValue = parseInt(decodedUserId, 10);
      //console.log(intValue)
      setdecodename(decodedUsername);
      setuserid(intValue);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("token")) {
        window.location.reload = "/login";
      }
      try {
        setloading(true);
        const { data: response } = await axios.get(
          `https://localhost:7009/api/Rooms/RoomDetailById?room_Id=${roomid}`
        );
        //console.log(response)
        setroom(response);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };
    fetchData();
  }, []);

  console.log(room);
  

  async function bookRoom() {
    
    var bookingDetails = {};
    if (room) {
      bookingDetails = {
        check_in_date: firstdate,
        check_out_date: lastdate,
        total_amount: JSON.stringify(totaldays * room.room_price),
        total_days: JSON.stringify(totaldays),
        guest_ID: userid,
        room_ID: room.room_Id,
        room_name: room.room_name,
      };
    }

    try {
      const result = await axios.post(
        "https://localhost:7009/api/Bookings/AddBooking",
        bookingDetails
      );
      swal
        .fire("Congrats", "Your Payment is Done", "Success")
        .then((result) => {
          window.location.href = "/home";
        });
    } catch (error) {}
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.room_name}</h1>
              <img src={room.imageUrls} className="bigimg" />
            </div>

            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <div>
                  <b>
                    <p>Name : {decodename} </p>
                    <p>From Date : {fromdate} </p>
                    <p>Till Date : {todate} </p>
                    <p>Max People : {room.total_People}</p>
                  </b>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days : {totaldays}</p>
                  <p>Rent per day : {room.room_price}</p>
                  <p>Total Amount : {totaldays * room.room_price}</p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <button className="btn btn-dark" onClick={bookRoom}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default BookingScreen;
