import React, { useState, useEffect } from "react";
import { client } from "../../client";

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

const MentorsPrivate = () => {
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([]);
  const [description, setDescription] = useState();

  const fetchMentors = async () => {
    setLoading(true);
    const mentorsQuery = `*[_type == "mentors"] {studentmentors[]->{fullName, bio, linkedin, profilePhoto, topics, _id}}`;
    const fetch = await client.fetch(mentorsQuery);
    const response = await fetch;
    setMentors(response[0].studentmentors);
    setLoading(false);
  };

  const fetchPage = async () => {
    setLoading(true);
    const pageQuery = `*[_type == "mentors"] {headline, description}`;
    const fetch = await client.fetch(pageQuery);
    const response = await fetch;
    setDescription(response[0].description);
    setLoading(false);
  };

  useEffect(() => {
    fetchMentors();
    fetchPage();
  }, []);

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
