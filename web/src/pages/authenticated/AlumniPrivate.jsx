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
