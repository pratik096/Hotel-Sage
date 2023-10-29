import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import { Link } from "react-router-dom";

function RegisterScreen() {
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [dob, setdob] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        mobile,
        dob,
        email,
        password,
        cpassword,
      };

      try {
        setloading(true);
        const result = await axios.post(
          "https://localhost:7009/api/Users/Register",
          user
        ).data;
        setloading(false);
        setsuccess(true);

        setname("");
        setmobile("");
        setdob("");
        setemail("");
        setpassword("");
        setcpassword("");
        //window.location.href = "/login";
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    } else {
      alert("Passwords not matched");
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      <div className="row justify-content-center mt-3">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registration Successful" />}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="phone number"
              value={mobile}
              onChange={(e) => {
                setmobile(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Date-Of-Birth : YYYY-MM-DD"
              value={dob}
              onChange={(e) => {
                setdob(e.target.value);
              }}
            />
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
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />

            <button className="btn btn-dark mt-3" onClick={register}>
              Register
            </button>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login"> Login </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
