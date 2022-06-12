import React from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import PageFooter from "../../components/public/PageFooter";
import ScrollToTop from "../ScrollToTop";
import { BackgroundBox } from "../../styledcomponents/globalstyles";
import styled from "styled-components";

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
          <PageHeader variant="h2" component="h1" textAlign="center">
            Startup School
          </PageHeader>
          <PageSubtitle variant="h3" component="h2" textAlign="center">
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

const PageHeader = styled(Typography)`
  && {
    font-size: 40px;
    margin-bottom: 24px;
  }

  @media (min-width: 768px) {
    && {
      font-size: 60px;
      padding: 0 60px;
      margin: 0 auto 32px auto;
    }
  }
`;

const PageSubtitle = styled(Typography)`
  && {
    font-size: 28px;
    margin-bottom: 40px;
    padding: 0 60px;
  }

  @media (min-width: 768px) {
    && {
      font-size: 36px;
      padding: 0 60px;
      margin: 0 auto 60px auto;
    }
  }
`;
