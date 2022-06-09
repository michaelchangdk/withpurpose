import React, { useState, useEffect } from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Box, Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import PageFooter from "../../components/public/PageFooter";
import ScrollToTop from "../ScrollToTop";
import { client } from "../../client";
import LoadingIndicator from "../../components/LoadingIndicator";
import PublicMentorCards from "../../components/public/PublicMentorCards";
import styled from "styled-components";

const MentorsPublic = () => {
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([]);

  // Write a function that shuffles the array
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchMentors = async () => {
    setLoading(true);
    const mentorsQuery = `*[_type == "companyMentors"] {bio, company, fullName, profilePhoto, _id}`;
    const fetch = await client.fetch(mentorsQuery);
    const response = await fetch;
    setMentors(shuffle(response));
    setLoading(false);
  };

  useEffect(() => {
    fetchMentors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={darkMode}>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          width: "100%",
          minHeight: "100vh",
          height: "100%",
        }}
      >
        <PublicHeader />
        <Container maxWidth="xl">
          <Typography variant="h3" textAlign="center">
            Mentors
          </Typography>
          {loading && <LoadingIndicator />}
          <CardContainer>
            {!loading &&
              mentors.map((mentor) => {
                return <PublicMentorCards key={mentor._id} mentor={mentor} />;
              })}
          </CardContainer>
          <PageFooter />
        </Container>
      </Box>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default MentorsPublic;

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
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1100px) {
    max-width: calc(1125px + 3vh);
    gap: 3vh;
    padding: 3vh 0;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
