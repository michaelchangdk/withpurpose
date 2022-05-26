import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Stack, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import styled from "styled-components";
import logo from "../../assets/BWP_logotype.svg";

const NoAccess = () => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkMode}>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          width: "100%",
          minHeight: "100vh",
          height: "100%",
        }}
      >
        <Stack justifyContent="center" alignItems="center" pt={12} spacing={2}>
          <Logo src={logo} alt="With Purpose Logo." />
          <Typography variant="h1" fontSize={24} fontWeight={400}>
            No access.
          </Typography>
          <Typography variant="h2" fontSize={20} fontWeight={400}>
            Please click below to return home.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/")}>
            Home
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default NoAccess;

const Logo = styled.img`
  width: 70px;
  height: 70px;
  margin: 0 auto;
`;
