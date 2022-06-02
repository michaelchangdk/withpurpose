import React from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { Box } from "@mui/material";
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
      <PageContainer>{/* PAGE INFORMATION */}</PageContainer>
      <ScrollToTop />
    </Box>
  );
};

export default MasterclassPage;
