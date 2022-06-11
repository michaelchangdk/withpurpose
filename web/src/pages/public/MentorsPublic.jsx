import React, { useState, useEffect } from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import PageFooter from "../../components/public/PageFooter";
import ScrollToTop from "../ScrollToTop";
import { client } from "../../client";
import LoadingIndicator from "../../components/LoadingIndicator";
import PublicMentorCards from "../../components/public/PublicMentorCards";
import styled from "styled-components/macro";

import { BackgroundBox } from "../../styledcomponents/globalstyles";

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
      <BackgroundBox
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <PublicHeader />
        <Container maxWidth="lg">
          <PageTitle variant="h3" textAlign="center">
            Mentors
          </PageTitle>
          {loading && <LoadingIndicator />}
          <CardContainer>
            {!loading &&
              mentors.map((mentor) => {
                return <PublicMentorCards key={mentor._id} mentor={mentor} />;
              })}
          </CardContainer>
          <PageFooter />
        </Container>
      </BackgroundBox>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default MentorsPublic;

const PageTitle = styled(Typography)`
  && {
    margin-bottom: 40px;
  }

  @media (min-width: 768px) {
    && {
      margin-bottom: 60px;
    }
  }
`;

const CardContainer = styled.div`
  display: grid;
  gap: 32px;
  margin: 0 auto;
  justify-content: center;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    margin-bottom: 60px;
  }

  @media (min-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
