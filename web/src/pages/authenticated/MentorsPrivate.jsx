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
import styled from "styled-components/macro";
import {
  BackgroundBox,
  DescriptionContainer,
  DescriptionTypography,
  DescriptionChild,
} from "../../styledcomponents/containers";
// Function Imports
import { FetchMentors } from "../../services/clientFunctions";

const MentorsPrivate = () => {
  const [loading, mentors, description] = FetchMentors();

  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <HeroHeader
        query={`*[_type == "mentors"] {heroImage, title, subtitle}`}
        type={"page"}
      />
      {description && (
        <DescriptionContainer backgroundcolor="#6356d7">
          <DescriptionChild>
            <DescriptionTypography>{description}</DescriptionTypography>
          </DescriptionChild>
        </DescriptionContainer>
      )}
      <Container maxWidth="lg">
        {loading && <LoadingIndicator />}
        <CardContainer>
          {!loading &&
            mentors.map((mentor) => {
              return <MentorCards key={mentor.fullName} mentor={mentor} />;
            })}
        </CardContainer>
        <PageFooter />
      </Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default MentorsPrivate;

const CardContainer = styled.div`
  display: grid;
  gap: 32px;
  margin: 0 auto;
  justify-content: center;
  padding-top: 32px;
  padding-bottom: 40px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    padding-bottom: 60px;
  }

  @media (min-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
