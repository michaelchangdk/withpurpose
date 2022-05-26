import React from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { Box } from "@mui/material";

const MentorsPrivate = () => {
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
        query={`*[_type == "landingpageelements" && order == 3] {heroImage, title, subtitle}`}
        type={"page"}
      />
      <PageContainer>{/* PAGE INFORMATION */}</PageContainer>
    </Box>
  );
};

export default MentorsPrivate;
