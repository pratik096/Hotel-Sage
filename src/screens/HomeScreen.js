import React, { useState, useEffect, useLayoutEffect } from "react";
import axios, { Axios } from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import "antd/dist/antd.css";
import Error from "../components/Error";
import moment from "moment";
import { DatePicker, Space } from "antd";
import { useParams } from "react-router-dom";

const { RangePicker } = DatePicker;

const HomeScreen = () => {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState();

  const [searchkey, setsearchkey] = useState();
  const [type, settype] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const { data: response } = await axios.get(
          "https://localhost:7009/api/Rooms/RoomList"
        );

        setrooms(response);
        setduplicaterooms(response);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.error(error.message);
        setloading(false);
      }
    };

    fetchData();
  }, []);


  function filterByDate(dates) {
    
    console.log(moment(dates[0]).format("DD-MM-YYYY"));
    const from = dates[0].format("DD-MM-YYYY");
    const to = dates[1].format("DD-MM-YYYY");
    setfromdate(from);
    settodate(to);

    //tempRooms
    var tempRooms = [];

    for (const room of duplicaterooms) {
      var availability = false;

      if (room.bookings.length > 0) {
        for (const booking of room.bookings) {
          //console.log(booking);

          //check between or equal to dates
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              moment(booking.check_in_date).format("DD-MM-YYYY"),
              moment(booking.check_out_date).format("DD-MM-YYYY"),
              "day",
              "[]"
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              moment(booking.check_in_date).format("DD-MM-YYYY"),
              moment(booking.check_out_date).format("DD-MM-YYYY"),
              "day",
              "[]"
            )
          ) {
            // if (moment(dates[0]).isSame(moment(checkInDate), 'day')) {
            // if (!moment(dates[0]).isSame(moment(checkInDate), 'day')) {
            if (
              !moment(dates[0]).isSame(moment(booking.check_in_date), "day") &&
              !moment(dates[0]).isSame(moment(booking.check_out_date), "day") &&
              !moment(dates[1]).isSame(moment(booking.check_in_date), "day") &&
              !moment(dates[1]).isSame(moment(booking.check_in_date), "day")
            ) {
              availability = true;
            }
          }
          
        }
      } else {
        availability = true;
      }
      // || room.bookings.length === 0

      if (availability === true) {
        tempRooms.push(room);
      }
      setrooms(tempRooms);
    }      
  }


  function filterBySearch() {
    const tempRooms = duplicaterooms.filter((room) =>
      room.room_name.toLowerCase().includes(searchkey.toLowerCase())
    );

    setrooms(tempRooms);
  }

  function filterByType(e) {
    settype(e);

    if (e !== "all") {
      const tempRooms = duplicaterooms.filter(
        (room) => room.room_Type.toLowerCase() == e.toLowerCase()
      );
      setrooms(tempRooms);
    } else {
      setrooms(duplicaterooms);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="YYYY-MM-DD" onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search Rooms"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="wizard">Wizard</option>
            <option value="anime">Anime</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-3">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
