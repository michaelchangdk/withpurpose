import React, { useState, useEffect } from "react";
import { client } from "../../client";
import WeekCards from "../../components/authenticated/WeekCards";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { Container } from "@mui/material";
// // import ReactPlayer from "react-player";
import styled from "styled-components";
import ScrollToTop from "../ScrollToTop";
import LoadingIndicator from "../../components/LoadingIndicator";
import { BackgroundBox } from "../../styledcomponents/globalstyles";

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
      </Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default WeekOverview;

const FrameDiv = styled.div`
  position: relative;
  padding-top: 56.25%;
  margin-top: 16px;
  border-radius: 4px;
  overflow: hidden;

  @media (min-width: 768px) {
    margin-top: 24px;
  }
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
