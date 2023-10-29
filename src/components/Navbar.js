import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

function Navbar() {
  const [username, setUsername] = useState("");

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  // temp changes
  // useEffect(() => {
  //   const tokenData = {
  //     token: localStorage.getItem("token")
  //     userid :
  //   };

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
      //const decodedUserId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      //console.log(decodedUserId)
      //console.log(decodedUsername)
      setUsername(decodedUsername);
    }
  }, []);

  return (
    <div>
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/home">
          Hotel Sage
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon">
            <i class="fa-solid fa-bars" style={{ color: "white" }}></i>
          </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            {username ? (
              <>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle "
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user"></i> {username}
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="/profile">
                      Profile
                    </a>
                    <a class="dropdown-item" href="#" onClick={logout}>
                      Logout
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li class="nav-item active">
                  <a class="nav-link" href="/register">
                    Register
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
