import React, { useState, useEffect } from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Box, Typography, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import { client } from "../../client";
import ScrollToTop from "../ScrollToTop";
import LoadingIndicator from "../../components/LoadingIndicator";
import TeamCards from "../../components/public/TeamCards";
import styled from "styled-components";
import PageFooter from "../../components/public/PageFooter";

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
            Meet the Team
          </Typography>
          {loading && <LoadingIndicator />}
          <CardContainer>
            {!loading &&
              team.map((member) => {
                return <TeamCards key={member._id} member={member} />;
              })}
          </CardContainer>
          <PageFooter />
        </Container>
      </Box>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default Team;

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
