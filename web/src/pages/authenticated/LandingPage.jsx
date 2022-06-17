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
import { FetchResponse } from "../../services/clientFunctions";
// Query Declaration
const pageQuery =
  '*[_type == "landingpage"] {_id, landingpageelements[]-> {title, headline, description, slug, coverImage, _id}}';

const LandingPage = () => {
  const [loading, response] = FetchResponse(pageQuery);

  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <HeroHeader
        query={`*[_type == "landingpage"] {heroImage, title, subtitle, _id}`}
        type={"page"}
        displayName={true}
      />
      <Container maxWidth="lg">
        {loading && <LoadingIndicator />}
        <TwoCardGrid>
          {!loading &&
            response[0].landingpageelements.map((card) => (
              <LandingCards
                key={card._id}
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
