import React, { useState, useEffect } from "react";
import { client } from "../../client";
import ReactPlayer from "react-player";

// MUI Imports
import { Container } from "@mui/material";
// Component Imports
import HeroHeader from "../../components/authenticated/HeroHeader";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import WeekCards from "../../components/authenticated/WeekCards";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import styled from "styled-components/macro";
import { BackgroundBox, FrameDiv } from "../../styledcomponents/containers";

// For fetching the page information
const pageQuery = `*[_type == "startupschool"] {introVideo, weeks[]-> {order, name, keyword, shortDescription, title, subtitle, liveSessionTitle, liveSessionDate, _id, module}}`;

const WeekOverview = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(null);
  const [introURL, setIntroURL] = useState("");

  useEffect(() => {
    client.fetch(pageQuery).then((response) => {
      setIntroURL(response[0].introVideo);
      setCards(response[0].weeks.filter((a) => !a._id.includes("draft")));
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
      <HeroHeader
        query={`*[_type == "startupschool"] {heroImage, title, subtitle}`}
        type={"page"}
      />
      <Container maxWidth="lg" sx={{ marginTop: "32px" }}>
        {loading && <LoadingIndicator />}
        {introURL.length > 0 && (
          <FrameDiv>
            <ReactPlayer
              url={introURL}
              controls={true}
              width="100%"
              height="100%"
              className="react-player"
            />
          </FrameDiv>
        )}
        <CardContainer>
          {!loading &&
            cards.map((week) => (
              <WeekCards
                key={week.title}
                name={week.name}
                title={week.title}
                keyword={week.keyword}
                shortDescription={week.shortDescription}
                liveSessionTitle={week.liveSessionTitle}
                liveSessionDate={week.liveSessionDate}
                module={week.module}
              />
            ))}
        </CardContainer>
        <PageFooter />
      </Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default WeekOverview;

const CardContainer = styled.div`
  display: grid;
  justify-items: center;
  gap: 32px;
  padding-top: 32px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
