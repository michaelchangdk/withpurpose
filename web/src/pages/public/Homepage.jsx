import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  console.log("you're on the homepage");
  return (
    <>
      Welcome! Here's a link to signup:<Link to="/login">Login</Link>
    </>
  );
};

export default Homepage;
