import React, { useState, useEffect } from "react";
import { client } from "../../client";

// MUI Imports
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// Component Imports
import PublicHeader from "../../components/public/PublicHeader";
import LoadingIndicator from "../../components/LoadingIndicator";
import TeamCards from "../../components/public/TeamCards";
import PageFooter from "../../components/public/PageFooter";
import ScrollToTop from "../ScrollToTop";
// Styling Imports
import { darkMode } from "../../styledcomponents/themeoptions";
import { PageTitle } from "../../styledcomponents/typography";
import {
  CardContainer,
  BackgroundBox,
} from "../../styledcomponents/containers";

const teamQuery = `*[_type == "teamMembers"] {city, fullName, linkedin, profilePhoto, quote, _id}`;

const Team = () => {
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    client.fetch(teamQuery).then((response) => {
      setTeam(response);
    });
    setLoading(false);
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
            Meet the Team
          </PageTitle>
          {loading && <LoadingIndicator />}
          <CardContainer>
            {!loading &&
              team.map((member) => {
                return <TeamCards key={member._id} member={member} />;
              })}
          </CardContainer>
          <PageFooter />
        </Container>
      </BackgroundBox>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default Team;
