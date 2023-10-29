import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; 

AOS.init({
  duration: 2000,
});

const Landingscreen = () => {
  return (
    <div className="row landing">
      <div className="col-md-12 text-center">
        <h2 data-aos="zoom-in" style={{ color: "white", fontSize: "100px" }}>
          Hotel Sage
        </h2>
        <h1 data-aos="zoom-out" style={{ color: "white" }}>
          "Live in the fantasy world you always dream to be in!!"
        </h1>

        <Link to="/home">
          <button className="btn landingbtn" style={{ color: "black" }}>
            Explore
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landingscreen;
