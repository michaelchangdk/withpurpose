import React, { useState, useEffect } from "react";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { Container } from "@mui/material";
import { client } from "../../client";
import styled from "styled-components";
import AlumniCards from "../../components/AlumniCards";
import ScrollToTop from "../ScrollToTop";
import LoadingIndicator from "../../components/LoadingIndicator";
import { BackgroundBox } from "../../styledcomponents/globalstyles";

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
      <LandingPageHero
        query={`*[_type == "community"] {heroImage, title, subtitle}`}
        type={"page"}
      />

      <Container maxWidth="lg">
        {loading && <LoadingIndicator />}

        <CardContainer>
          {!loading &&
            alumni.map((student) => {
              return <AlumniCards key={student._id} alumni={student} />;
            })}
        </CardContainer>
      </Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default AlumniPrivate;

const CardContainer = styled.div`
  display: grid;
  gap: 32px;
  margin: 0 auto;
  justify-content: center;
  padding-top: 32px;
  padding-bottom: 40px;

  @media (min-width: 768px) {
    max-width: calc(750px + 3vh);
    grid-template-columns: 1fr 1fr;
    padding-bottom: 60px;
  }

  @media (min-width: 1100px) {
    max-width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
