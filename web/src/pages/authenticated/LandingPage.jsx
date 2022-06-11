import React, { useEffect, useState } from "react";
import { client } from "../../client";
import LandingCards from "../../components/authenticated/LandingCards";
import { Container } from "@mui/material";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import styled from "styled-components";
import ScrollToTop from "../ScrollToTop";
import LoadingIndicator from "../../components/LoadingIndicator";
import { BackgroundBox } from "../../styledcomponents/globalstyles";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(null);
  const cardsQuery =
    '*[_type == "landingpageelements"] {order, title, headline, description, linkTo, coverImage}';

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
      <Container maxWidth="lg">
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
    </BackgroundBox>
  );
};

export default LandingPage;

const CardGrid = styled.div`
  display: grid;
  gap: 32px;
  justify-items: center;
  padding-top: 16px;
  padding-bottom: 40px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding-top: 24px;
    padding-bottom: 40px;
  }
`;
