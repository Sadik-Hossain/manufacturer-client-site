import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const homeRedirect = () => {
    navigate("/home");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "5rem 0",
        background:
          "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
      }}
    >
      <span
        style={{
          color: "#ddd",
          border: "2px solid #ddd",
          fontSize: "3rem",
          padding: "2rem",
          borderRadius: "100%",
          display: "inline-block",
        }}
      >
        404
      </span>
      <div>
        <div style={{ padding: "1rem 0" }}>
          <p style={{ fontSize: "1.3rem", color: "#ddd" }}>Not Found</p>
          <p style={{ fontSize: "1.3rem", color: "#ddd" }}>
            sorry, we cannot find what you're looking for :-(
          </p>
        </div>
        <button
          style={{
            padding: "0 1rem",
            color: "white",
            border: "0",
            background: "#2F4858",
            cursor: "pointer",
          }}
          onClick={homeRedirect}
        >
          <p style={{ fontSize: "1.3rem" }}>Go back Home</p>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
