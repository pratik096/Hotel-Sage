import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import swal from "sweetalert2";

const Addroom = () => {
  const [room_name, setname] = useState(null);
  const [room_price, setrentperday] = useState(null);
  const [total_People, setmaxcount] = useState(null);
  const [room_description, setdescription] = useState(null);
  const [room_Type, settype] = useState(null);
  const [imageUrls, setimageurl] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function addRoom() {
    const newRoom = {
      room_name,
      total_People,
      room_price,
      imageUrls,
      room_Type,
      room_description,
    };
    console.log(newRoom);

    try {
      setloading(true);
      const results = await axios.post(
        "https://localhost:7009/api/Rooms/AddRoom",
        newRoom
      ).data;
      console.log(results);
      setloading(false);

      swal
        .fire(
          "Congrats",
          "Your new Room has been added successfully",
          "success"
        )
        .then((results) => {
          window.location.href = "/home";
        });
    } catch (error) {
      console.log(error);
      setloading(false);
      swal.fire("Oopps", "Something went wrong", "error");
    }
  }

  return (
    <>
      <div className="row">
        {loading && <Loader />}

        <div className="col-md-5">
          <div className="form-group">
            <input
              type="text"
              classaName="form-control"
              placeholder="Room name"
              value={room_name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              classaName="form-control"
              placeholder="Total People"
              value={total_People}
              onChange={(e) => {
                setmaxcount(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              classaName="form-control"
              placeholder="Room Price"
              value={room_price}
              onChange={(e) => {
                setrentperday(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-md-5">
          <div className="form-group">
            <input
              type="text"
              classaName="form-control"
              placeholder="Image Url"
              value={imageUrls}
              onChange={(e) => {
                setimageurl(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              classaName="form-control"
              placeholder="Room Type"
              value={room_Type}
              onChange={(e) => {
                settype(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              classaName="form-control"
              placeholder="Description"
              value={room_description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
          </div>

          <div className="text-right">
            <button className="btn btn-dark" onClick={addRoom}>
              Add Room
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addroom;
