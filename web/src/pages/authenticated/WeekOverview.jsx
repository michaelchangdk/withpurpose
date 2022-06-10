import React, { useState, useEffect } from "react";
import { client } from "../../client";
import WeekCards from "../../components/authenticated/WeekCards";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { Box, Container } from "@mui/material";
import ReactPlayer from "react-player";
import styled from "styled-components";
import ScrollToTop from "../ScrollToTop";
import LoadingIndicator from "../../components/LoadingIndicator";

// For setting the week cards
const weekQuery =
  '*[_type == "week"] {order, name, keyword, shortDescription, title, subtitle, liveSessionTitle, liveSessionDate, _id, module}';

// For fetching the page information
const pageQuery = `*[_type == "startupschool"] {introVideo}`;

const WeekOverview = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(null);
  const [introURL, setIntroURL] = useState("");

  useEffect(() => {
    client.fetch(weekQuery).then((response) => {
      let published = response.filter((a) => !a._id.includes("draft"));
      setCards(published.sort((a, b) => a.order - b.order));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    client.fetch(pageQuery).then((response) => {
      setIntroURL(response[0].introVideo);
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
    </Box>
  );
};

export default WeekOverview;

const FrameDiv = styled.div`
  position: relative;
  padding-top: 56.25%;
  margin-top: 3vh;
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
  gap: 2vh;
  padding: 2vh 0;
  margin: 0 auto;
  /* max-width: 500px; */

  @media (min-width: 768px) {
    gap: 3vh;
    padding: 3vh 0;
  }

  @media (min-width: 1100px) {
    grid-template-columns: 1fr 1fr;
    gap: 2vh;
  }
`;
