import React, { useState, useEffect } from "react";
import { client } from "../../client";
import WeekCards from "../../components/authenticated/WeekCards";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { Container } from "@mui/material";
// // import ReactPlayer from "react-player";
import styled from "styled-components";
import { BackgroundBox } from "../../styledcomponents/globalstyles";

import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";

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
      <LandingPageHero
        query={`*[_type == "startupschool"] {heroImage, title, subtitle}`}
        type={"page"}
      />
      <Container maxWidth="lg">
        {loading && <LoadingIndicator />}
        {introURL.length > 0 && (
          <FrameDiv>
            <IFrame src={introURL} allowFullScreen frameBorder="0" />
            {/* <ReactPlayer
              url={introURL}
              controls={true}
              width="100%"
              height="100%"
              className="react-player"
            /> */}
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

const FrameDiv = styled.div`
  position: relative;
  padding-top: 56.25%;
  border-radius: 4px;
  overflow: hidden;
`;

const IFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CardContainer = styled.div`
  display: grid;
  justify-items: center;
  gap: 32px;
  padding-top: 32px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
