import React from "react";

// MUI Imports
import { Container } from "@mui/material";
// Component Imports
import HeroHeader from "../../components/authenticated/HeroHeader";
import LandingCards from "../../components/authenticated/LandingCards";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import { BackgroundBox, TwoCardGrid } from "../../styledcomponents/containers";
// Functions Import
import { FetchLandingPage } from "../../services/clientFunctions";
// Query Declaration
const pageQuery =
  '*[_type == "landingpage"] {landingpageelements[]-> {title, headline, description, slug, coverImage}}';

const LandingPage = () => {
  const [loading, cards] = FetchLandingPage(pageQuery);

  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <HeroHeader
        query={`*[_type == "landingpage"] {heroImage, title, subtitle}`}
        type={"page"}
        displayName={true}
      />
      <Container maxWidth="lg">
        {loading && <LoadingIndicator />}
        <TwoCardGrid>
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
        </TwoCardGrid>
        <PageFooter />
      </Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default LandingPage;
