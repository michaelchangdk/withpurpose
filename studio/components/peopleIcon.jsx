import React from "react";
import icon from "../assets/people_pink.svg";

const peopleIcon = (props) => {
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

export default peopleIcon;
