import React, { useState } from "react";
import "../index.css";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageUrls} className="smallimg" />
      </div>
      <div className="col-md-7 ">
        <h1>{room.room_name}</h1>

        <p>
          <b>Max People </b>: {room.total_People}
        </p>
        <p>
          <b>Price </b>: {room.room_price}
        </p>
        <p>
          <b>Room Type </b>: {room.room_Type}
        </p>

        <div className="text-right">
          {fromdate && todate && localStorage.getItem("token") && (
            <Link to={`/book/${room.room_Id}/${fromdate}/${todate}`}>
              <button className="btn btn-dark mr-2">Book Now</button>
            </Link>
          )}
          <button className="btn btn-dark" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.room_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={room.imageUrls} className="d-block w-100 bigimg" />
          <p>{room.room_description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
