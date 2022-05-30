import React from "react";
import logo from "../assets/BWP_logotype.svg";

const wPurposeLogo = () => {
  return (
    <div style={{ display: "flex" }}>
      <img
        style={{ height: "50px", width: "50px" }}
        src={logo}
        alt="wPurpose logo"
      />
      <p style={{ marginLeft: "20px", fontWeight: 500, fontSize: "18px" }}>
        With Purpose
      </p>
    </div>
  );
};

export default wPurposeLogo;
