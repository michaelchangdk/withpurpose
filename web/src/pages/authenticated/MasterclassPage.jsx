import React from "react";

// MUI Imports
import { Container } from "@mui/material";
// Component Imports
import HeroHeader from "../../components/authenticated/HeroHeader";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import { BackgroundBox } from "../../styledcomponents/containers";

const MasterclassPage = () => {
  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        width: "100%",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <HeroHeader
        query={`*[_type == "masterclasses"] {heroImage, title, subtitle, _id}`}
        type={"page"}
      />
      <Container maxWidth="lg">
        <PageFooter />
      </Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default MasterclassPage;
