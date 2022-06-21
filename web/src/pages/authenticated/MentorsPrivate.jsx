import React from "react";

// MUI Imports
import { Container } from "@mui/material";
// Component Imports
import HeroHeader from "../../components/authenticated/HeroHeader";
import MentorCards from "../../components/authenticated/MentorCards";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import {
  BackgroundBox,
  DescriptionContainer,
  DescriptionTypography,
  DescriptionChild,
  FourCardGrid,
} from "../../styledcomponents/containers";
// Function Imports
import { FetchResponse } from "../../services/clientFunctions";
// Query Declaration
const pageQuery = `*[_type == "mentors" && !(_id in path('drafts.**'))] {description, _id, studentmentors[]->{fullName, bio, linkedin, profilePhoto, topics, _id}}`;

const MentorsPrivate = () => {
  const [loading, response] = FetchResponse(pageQuery);

  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <HeroHeader
        query={`*[_type == "mentors" && !(_id in path('drafts.**'))] {heroImage, title, subtitle, _id}`}
        type={"page"}
      />
      {!loading && response[0].description && (
        <DescriptionContainer backgroundcolor="#6356d7">
          <DescriptionChild>
            <DescriptionTypography>
              {response[0].description}
            </DescriptionTypography>
          </DescriptionChild>
        </DescriptionContainer>
      )}
      <Container maxWidth="lg">
        {loading && <LoadingIndicator />}
        <FourCardGrid>
          {!loading &&
            response[0].studentmentors.map((mentor) => {
              return <MentorCards key={mentor.fullName} mentor={mentor} />;
            })}
        </FourCardGrid>
        <PageFooter />
      </Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default MentorsPrivate;
