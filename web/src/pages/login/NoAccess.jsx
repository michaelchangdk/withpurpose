import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// PLEASE LOGIN / U DONT HAVE ACCESS TO THIS PAGE YET

const NoAccess = () => {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/");
  };
  return (
    <>
      No access. Please click below to return home.
      <Button onClick={navigateLogin}>Home</Button>
    </>
  );
};

export default NoAccess;
