import React, { useEffect, useState } from "react";
import { client } from "../../client";

// MUI Imports
import { Container } from "@mui/material";
// Component Imports
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import LandingCards from "../../components/authenticated/LandingCards";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import styled from "styled-components/macro";
import { BackgroundBox } from "../../styledcomponents/containers";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(null);
  const cardsQuery =
    '*[_type == "landingpageelements"] {order, title, headline, description, slug, coverImage}';

  useEffect(() => {
    client.fetch(cardsQuery).then((response) => {
      setCards(response.sort((a, b) => a.order - b.order));
      setLoading(false);
    });
  }, []);

  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <LandingPageHero
        query={`*[_type == "landingpage"] {heroImage, title, subtitle}`}
        type={"page"}
        displayName={true}
      />
      <Container maxWidth="lg" sx={{ marginTop: "32px" }}>
        {loading && <LoadingIndicator />}
        <CardGrid>
          {!loading &&
            cards.map((card) => (
              <LandingCards
                key={card.order}
                title={card.title}
                headline={card.headline}
                description={card.description}
                linkTo={card.slug.current}
                coverImage={card.coverImage}
              />
            ))}
        </CardGrid>
        <PageFooter />
      </Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default LandingPage;

const CardGrid = styled.div`
  display: grid;
  gap: 32px;
  justify-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
