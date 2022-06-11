import React, { useState, useEffect } from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Typography, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import styled from "styled-components";
import LoadingIndicator from "../../components/LoadingIndicator";
import AlumniCards from "../../components/AlumniCards";
import { client } from "../../client";
import PageFooter from "../../components/public/PageFooter";
import ScrollToTop from "../ScrollToTop";

import { BackgroundBox } from "../../styledcomponents/globalstyles";

const AlumniPublic = () => {
  const [loading, setLoading] = useState(true);
  const [alumni, setAlumni] = useState([]);

  const fetchAlumni = async () => {
    setLoading(true);
    const alumniQuery = `*[_type == "alumni"] {city, class, fullName, linkedin, profilePhoto, _id}`;
    const fetch = await client.fetch(alumniQuery);
    const response = await fetch;
    setAlumni(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  return (
    <ThemeProvider theme={darkMode}>
      <BackgroundBox
        sx={{ bgcolor: "background.default", color: "text.primary" }}
      >
        <PublicHeader />
        <Container maxWidth="lg">
          <PageTitle variant="h3" textAlign="center">
            Our Alumni
          </PageTitle>
          {loading && <LoadingIndicator />}
          <CardContainer>
            {!loading &&
              alumni.map((student) => {
                return <AlumniCards key={student._id} alumni={student} />;
              })}
            {/* PAGE INFORMATION */}
          </CardContainer>
          <PageFooter />
        </Container>
      </BackgroundBox>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default AlumniPublic;

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
    max-width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
