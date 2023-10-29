import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Link } from "react-router-dom";
import RegisterScreen from "./RegisterScreen";

function LoginScreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function login() {
    const user = {
      email,
      password,
    };

    try {
      setloading(true);
      const result = await axios.post(
        "https://localhost:7009/api/Users/Login",
        user
      );
      setloading(false);
      //console.log(result)
      const token = result.data;

      // Store the token in localStorage
      //console.log(token);
      localStorage.setItem("token", token);

      // Redirect to the home page
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }

  return (
    <div>
      {loading && <Loader />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message="Invalid Credentials" />}
          <div className="bs">
            <h2>Login</h2>

            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <button className="btn btn-dark mt-3" onClick={login}>
              Login
            </button>
            <p className ="text-center mt-3">
              Don't have an account? <Link to = "/register"> Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
