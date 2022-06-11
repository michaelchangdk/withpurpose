import React, { useState, useEffect } from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Typography, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import { client } from "../../client";
import ScrollToTop from "../ScrollToTop";
import LoadingIndicator from "../../components/LoadingIndicator";
import TeamCards from "../../components/public/TeamCards";
import styled from "styled-components";
import PageFooter from "../../components/public/PageFooter";
import { BackgroundBox } from "../../styledcomponents/globalstyles";

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
          <PageTitle variant="h3" textAlign="center">
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
    max-width: calc(750px + 3vh);
    grid-template-columns: 1fr 1fr;
    margin-bottom: 60px;
  }

  @media (min-width: 1100px) {
    max-width: calc(1125px + 3vh);
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
