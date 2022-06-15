import React from "react";
import { Typography } from "@mui/material";
import styled from "styled-components";

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
`;
