import React from "react";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { Box, Container } from "@mui/material";
import ScrollToTop from "../ScrollToTop";

const MasterclassPage = () => {
  return (
    <Box
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
      <Container maxWidth="xl"></Container>
      <ScrollToTop />
    </Box>
  );
};

export default MasterclassPage;
