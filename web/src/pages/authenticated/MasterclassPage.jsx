import React from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { Box } from "@mui/material";

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
        query={`*[_type == "landingpage" && order == 2]`}
        type={"landingpage"}
      />
      <PageContainer>{/* PAGE INFORMATION */}</PageContainer>
    </Box>
  );
};

export default MasterclassPage;
