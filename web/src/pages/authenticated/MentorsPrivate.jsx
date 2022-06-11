import React, { useState, useEffect } from "react";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { Typography, Container } from "@mui/material";
import ScrollToTop from "../ScrollToTop";
import LoadingIndicator from "../../components/LoadingIndicator";
import { client } from "../../client";
import MentorCards from "../../components/authenticated/MentorCards";
import styled from "styled-components";
import { BackgroundBox } from "../../styledcomponents/globalstyles";

const MentorsPrivate = () => {
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([]);
  const [description, setDescription] = useState();

  const fetchMentors = async () => {
    setLoading(true);
    const mentorsQuery = `*[_type == "studentMentors"] {fullName, bio, linkedin, profilePhoto, topics, _id}`;
    const fetch = await client.fetch(mentorsQuery);
    const response = await fetch;
    setMentors(response);
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
      <LandingPageHero
        query={`*[_type == "mentors"] {heroImage, title, subtitle}`}
        type={"page"}
      />
      {/* {description && (
        <DescriptionContainer>
          <Typography>{description}</Typography>
        </DescriptionContainer>
      )} */}

      {description && (
        <DescriptionContainer>
          <DescriptionChild>
            <StyledTypo>{description}</StyledTypo>
          </DescriptionChild>
        </DescriptionContainer>
      )}
      <Container maxWidth="lg">
        {" "}
        {loading && <LoadingIndicator />}
        <CardContainer>
          {!loading &&
            mentors.map((mentor) => {
              return <MentorCards key={mentor.fullName} mentor={mentor} />;
            })}
        </CardContainer>
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

const DescriptionContainer = styled.div`
  /* background-color: #e93a7d; */
  background-color: #6356d7;
  /* background-color: #5491e3; */
  color: white;
  padding: 48px 0;
  white-space: pre-line;
  vertical-align: bottom;

  @media (min-width: 768px) {
    padding: 48px 0;
  }
`;

const DescriptionChild = styled(Container)`
  && {
    padding: 0 84px;
  }
`;

const StyledTypo = styled(Typography)`
  /* && {
} */

  @media (min-width: 768px) {
    && {
      font-size: 18px;
      line-height: 30px;
    }
  }
`;
