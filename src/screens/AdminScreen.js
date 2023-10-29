import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Bookings from "../components/BookingsAdmin";
import Rooms from "../components/RoomsAdmin";
import Users from "../components/UsersAdmin";
import jwt_decode from "jwt-decode";
import Addroom from "../components/AddRoom";

const { TabPane } = Tabs;

function AdminScreen() {
  const [userrole, setuserrole] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      //console.log(decodedToken);
      const decodedUserrole =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      setuserrole(decodedUserrole);
      console.log(decodedUserrole);
      if (decodedUserrole === "Customer") {
        window.location.href = "/home";
      }
    }
  }, []);

  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <Addroom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminScreen;
