import React from "react";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { Container } from "@mui/material";
import ScrollToTop from "../ScrollToTop";
import { BackgroundBox } from "../../styledcomponents/globalstyles";

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
      <LandingPageHero
        query={`*[_type == "masterclasses"] {heroImage, title, subtitle}`}
        type={"page"}
      />
      <Container maxWidth="lg"></Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default MasterclassPage;
