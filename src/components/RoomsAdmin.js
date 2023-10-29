import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Rooms = () => {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await (
          await axios.get("https://localhost:7009/api/Rooms/RoomList")
        ).data;
        setrooms(data);
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
          <h1>Rooms</h1>
          {loading && <Loader />}
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Room ID</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Rent per day</th>
                <th scope="col">Max People</th>
              </tr>
            </thead>
            <tbody>
              {rooms &&
                rooms.map((room) => {
                  return (
                    <tr>
                      <td scope="row">{room.room_Id}</td>
                      <td>{room.room_name}</td>
                      <td>{room.room_Type}</td>
                      <td>{room.room_price}</td>
                      <td>{room.total_People}</td>
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

export default Rooms;
