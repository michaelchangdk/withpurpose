import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      Welcome! Here's a link to signup:<Link to="/login">Login</Link>
    </>
  );
};

export default Homepage;
