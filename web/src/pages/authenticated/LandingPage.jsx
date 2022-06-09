import React, { useEffect, useState } from "react";
import { client } from "../../client";
import LandingCards from "../../components/authenticated/LandingCards";
import { Box, Container } from "@mui/material";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import styled from "styled-components";
import ScrollToTop from "../ScrollToTop";
import LoadingIndicator from "../../components/LoadingIndicator";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(null);
  const query =
    '*[_type == "landingpageelements"] {order, title, headline, description, linkTo, coverImage}';

  useEffect(() => {
    client.fetch(query).then((response) => {
      setCards(response.sort((a, b) => a.order - b.order));
      setLoading(false);
    });
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        width: "100%",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <LandingPageHero
        query={`*[_type == "landingpage"] {heroImage, title, subtitle}`}
        type={"page"}
        displayName={true}
      />
      <Container maxWidth="xl">
        {loading && <LoadingIndicator />}
        <CardGrid>
          {!loading &&
            cards.map((card) => (
              <LandingCards
                key={card.order}
                title={card.title}
                headline={card.headline}
                description={card.description}
                linkTo={card.linkTo}
                coverImage={card.coverImage}
              />
            ))}
        </CardGrid>
      </Container>
      <ScrollToTop />
    </Box>
  );
};

export default LandingPage;

const CardGrid = styled.div`
  display: grid;
  /* justify-content: center;
  align-items: center; */
  gap: 2vh;
  padding: 2vh 0;
  margin: 0 auto;
  /* max-width: 500px; */

  @media (min-width: 768px) {
    max-width: calc(1200px + 3vh);
    /* grid-template-columns: 500px 500px; */
    grid-template-columns: 1fr 1fr;
    gap: 3vh;
    padding: 3vh 0;
    justify-items: center;
  }
`;
