import React from "react";

// MUI Imports
import { Container } from "@mui/material";
// Component Imports
import HeroHeader from "../../components/authenticated/HeroHeader";
import PageFooter from "../../components/global/PageFooter";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import ModuleCards from "../../components/authenticated/ModuleCards";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import {
  BackgroundBox,
  DescriptionContainer,
  DescriptionTypography,
  DescriptionChild,
} from "../../styledcomponents/containers";
// Function Imports
import { FetchResponse } from "../../services/clientFunctions";
// Query Declaration
const pageQuery = `*[_type == "masterclasses" && !(_id in path('drafts.**'))] {description, _id, masterclassModules[]}`;

const MasterclassPage = () => {
  const [loading, response] = FetchResponse(pageQuery);

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
        query={`*[_type == "masterclasses" && !(_id in path('drafts.**'))] {heroImage, title, subtitle, _id}`}
        type={"page"}
      />
      {!loading && response[0].description && (
        <DescriptionContainer backgroundcolor="#5491e3">
          <DescriptionChild>
            <DescriptionTypography>
              {response[0].description}
            </DescriptionTypography>
          </DescriptionChild>
        </DescriptionContainer>
      )}
      <Container maxWidth="lg">
        {loading && <LoadingIndicator />}
        {!loading &&
          !!response[0].masterclassModules &&
          response[0].masterclassModules.map((module) => (
            <ModuleCards
              key={module.title}
              duration={module.duration}
              name={module.name}
              title={module.title}
              type={module.type}
              module={module}
            />
          ))}
        <PageFooter />
      </Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default MasterclassPage;
