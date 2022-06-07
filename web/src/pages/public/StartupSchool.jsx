import React from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Box, Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import PageFooter from "../../components/public/PageFooter";

const StartupSchool = () => {
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
        <PublicHeader />
        <Container maxWidth="xl">
          <Typography variant="h3" textAlign="center">
            Registrations for the Startup School are now open!
          </Typography>
        </Container>
        <PageFooter />
      </Box>
    </ThemeProvider>
  );
};

export default StartupSchool;
