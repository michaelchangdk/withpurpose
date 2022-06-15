import React from "react";

// MUI Imports
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// Component Imports
import PublicHeader from "../../components/public/PublicHeader";
import PageFooter from "../../components/public/PageFooter";
import ScrollToTop from "../ScrollToTop";
// Styling Imports
import { darkMode } from "../../styledcomponents/themeoptions";
import { BackgroundBox } from "../../styledcomponents/globalstyles";
import { PageTitle, PageSubtitle } from "../../styledcomponents/typography";

const StartupSchool = () => {
  return (
    <ThemeProvider theme={darkMode}>
      <BackgroundBox
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <PublicHeader />
        <Container maxWidth="lg">
          <PageTitle variant="h2" component="h1">
            Startup School
          </PageTitle>
          <PageSubtitle variant="h3" component="h2">
            Registrations for the Startup School are now open!
          </PageSubtitle>
        </Container>
        <PageFooter />
      </BackgroundBox>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default StartupSchool;
