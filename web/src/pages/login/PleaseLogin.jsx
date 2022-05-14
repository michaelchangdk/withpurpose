import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const PleaseLogin = () => {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/");
  };
  return (
    <>
      Please login to access the page.
      <Button onClick={navigateLogin}>Home</Button>
    </>
  );
};

export default PleaseLogin;