import React, { useState, useEffect } from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { Box, Typography } from "@mui/material";
import ScrollToTop from "../ScrollToTop";
import LoadingIndicator from "../../components/LoadingIndicator";
import { client } from "../../client";
import MentorCards from "../../components/authenticated/MentorCards";
import styled from "styled-components";

const MentorsPrivate = () => {
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([]);
  const [description, setDescription] = useState();

  const fetchMentors = async () => {
    setLoading(true);
    const alumniQuery = `*[_type == "studentMentors"] {fullName, bio, linkedin, profilePhoto, topics, _id}`;
    const fetch = await client.fetch(alumniQuery);
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
        query={`*[_type == "mentors"] {heroImage, title, subtitle}`}
        type={"page"}
      />
      {description && (
        <DescriptionContainer>
          <Typography>{description}</Typography>
        </DescriptionContainer>
      )}
      <PageContainer>
        {loading && <LoadingIndicator />}

        <CardContainer>
          {!loading &&
            mentors.map((mentor) => {
              return <MentorCards key={mentor.fullName} mentor={mentor} />;
            })}
        </CardContainer>
      </PageContainer>
      <ScrollToTop />
    </Box>
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
    max-width: calc(750px + 3vh);
    gap: 3vh;
    padding: 3vh 0;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1100px) {
    max-width: calc(1125px + 3vh);
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
`;
