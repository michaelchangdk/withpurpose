import React, { useState, useEffect } from "react";
import { client } from "../../client";

// MUI Imports
import { Container } from "@mui/material";
// Component Imports
import HeroHeader from "../../components/authenticated/HeroHeader";
import AlumniCards from "../../components/AlumniCards";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import {
  CardContainer,
  BackgroundBox,
} from "../../styledcomponents/containers";

const AlumniPrivate = () => {
  const [loading, setLoading] = useState(true);
  const [alumni, setAlumni] = useState([]);

  const fetchAlumni = async () => {
    setLoading(true);
    const alumniQuery = `*[_type == "community"] {alumni[]->{fullName, city, class, linkedin, profilePhoto}}`;
    const fetch = await client.fetch(alumniQuery);
    const response = await fetch;
    setAlumni(response[0].alumni);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <HeroHeader
        query={`*[_type == "community"] {heroImage, title, subtitle}`}
        type={"page"}
      />

      <Container maxWidth="lg" sx={{ marginTop: "32px" }}>
        {loading && <LoadingIndicator />}

        <CardContainer>
          {!loading &&
            alumni.map((student) => {
              return <AlumniCards key={student._id} alumni={student} />;
            })}
        </CardContainer>
        <PageFooter />
      </Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default AlumniPrivate;
