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
          <StyledTypo>{description}</StyledTypo>
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
  gap: 2vh;
  padding: 2vh 0;
  margin: 0 auto;
  justify-content: center;

  @media (min-width: 768px) {
    /* max-width: calc(750px + 3vh); */
    gap: 3vh;
    padding: 3vh 0;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1100px) {
    /* max-width: calc(1125px + 3vh); */
    gap: 3vh;
    padding: 3vh 0;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const DescriptionContainer = styled.div`
  background-color: #e93a7d;
  color: white;
  padding: 48px;
  white-space: pre-line;
  vertical-align: bottom;

  @media (min-width: 1100px) {
    padding-left: 30vh;
    padding-right: 30vh;
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
