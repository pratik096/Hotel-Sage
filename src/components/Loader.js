import React, { useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="sweet-loading text-center">
        <PuffLoader
          color="#000"
          loading={loading}
          css=""
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
