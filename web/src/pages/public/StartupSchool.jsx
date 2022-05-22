import React from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";

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
        Startup School Info
      </Box>
    </ThemeProvider>
  );
};

export default StartupSchool;
