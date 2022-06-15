import React, { useState, useEffect } from "react";
import { client } from "../../client";

// MUI Imports
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
// Component Imports
import PublicHeader from "../../components/public/PublicHeader";
import LoadingIndicator from "../../components/LoadingIndicator";
import AlumniCards from "../../components/AlumniCards";
import PageFooter from "../../components/public/PageFooter";
import ScrollToTop from "../ScrollToTop";
// Styling Imports
import { darkMode } from "../../styledcomponents/themeoptions";
import { PageTitle } from "../../styledcomponents/typography";
import {
  CardContainer,
  BackgroundBox,
} from "../../styledcomponents/containers";

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
          <PageTitle variant="h2" component="h1">
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
