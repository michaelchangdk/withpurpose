import React, { useState, useEffect } from "react";
import { client } from "../../client";

// MUI Imports
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// Component Imports
import PublicHeader from "../../components/public/PublicHeader";
import LoadingIndicator from "../../components/LoadingIndicator";
import PublicMentorCards from "../../components/public/PublicMentorCards";
import PageFooter from "../../components/public/PageFooter";
import ScrollToTop from "../ScrollToTop";
// Styling Imports
import { darkMode } from "../../styledcomponents/themeoptions";
import { PageTitle } from "../../styledcomponents/typography";
import {
  CardContainer,
  BackgroundBox,
} from "../../styledcomponents/containers";

const MentorsPublic = () => {
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([]);

  // Write a function that shuffles an array
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
          <PageTitle variant="h2" component="h1">
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
