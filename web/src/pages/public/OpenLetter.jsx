import React from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import PageFooter from "../../components/public/PageFooter";
import ScrollToTop from "../ScrollToTop";
import { BackgroundBox } from "../../styledcomponents/globalstyles";
import styled from "styled-components";

const OpenLetter = () => {
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
          <PageTitle variant="h3" textAlign="center">
            Open Letter
          </PageTitle>
        </Container>
        <PageFooter />
      </BackgroundBox>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default OpenLetter;

const PageTitle = styled(Typography)`
  && {
    margin-bottom: 40px;
  }

  @media (min-width: 768px) {
    && {
      margin-bottom: 60px;
    }
  }
`;
