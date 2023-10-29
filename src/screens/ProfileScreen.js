import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import MyBookings from "../components/UserBookings";
import Loader from "../components/Loader";
import Error from "../components/Error";

const { TabPane } = Tabs;

function ProfileScreen() {
  const [userid, setuserid] = useState(null);
  const [username, setusername] = useState();
  const [useremail, setuseremail] = useState("");
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      //console.log(decodedToken);
      const decodedUsername =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];
      const decodedUserId =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      const decodedUseremail =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ];
      setuserid(decodedUserId);
      setusername(decodedUsername);
      setuseremail(decodedUseremail);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>

          <br />

          <h1>Name : {username}</h1>
          <h1>Email : {useremail}</h1>
          <h1>UserID : {userid}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings uid={userid} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileScreen;

