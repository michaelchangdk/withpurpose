import React from "react";
import icon from "../assets/private_pink.svg";

const privateIcon = (props) => {
  return (
    <>
      <img
        src={icon}
        alt="school icon"
        style={{ width: "35px", height: "35px" }}
        props={props}
      />
    </>
  );
};

export default privateIcon;
