import React from "react";
// MUI Imports
import { Typography } from "@mui/material";
// Styling Imports
import styled from "styled-components/macro";

const PageFooter = () => {
  const year = new Date().getFullYear();
  return (
    <Footer>
      <Typography fontSize={14}>©{year} by With Purpose Ventures</Typography>
      <Typography fontSize={14}>
        Supported by Global Shapers Copenhagen
      </Typography>
      <Typography fontSize={14}>Copenhagen, Denmark</Typography>
    </Footer>
  );
};

export default PageFooter;

const Footer = styled.footer`
  text-align: center;
  padding-bottom: 10px;
  padding-top: 40px;

  @media (min-width: 768px) {
    padding-top: 60px;
  }
`;
