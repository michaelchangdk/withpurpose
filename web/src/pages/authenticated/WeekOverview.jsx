import React, { useState, useEffect } from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import { client } from "../../client";
import WeekCards from "../../components/authenticated/WeekCards";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { Box, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useSelector } from "react-redux";

// For setting the week cards
const weekQuery =
  '*[_type == "week"] {order, name, keyword, shortDescription, title, subtitle, liveSessionTitle, liveSessionDate, _id, module}';

// For fetching the page information
const pageQuery = `*[_type == "startupschool"] {introVideo}`;

const WeekOverview = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(null);
  const [introURL, setIntroURL] = useState("");

  const firstName = useSelector(
    (store) => store.authenticated.displayName
  ).split(" ")[0];

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
      <PageContainer>
        {loading && <p>loading</p>}
        <CardContainer>
          <Typography variant="h4" fontWeight={500}>
            Welcome, {firstName}!
          </Typography>
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
      </PageContainer>
    </Box>
  );
};

export default WeekOverview;

const FrameDiv = styled.div`
  position: relative;
  padding-top: 56.25%;
`;

const CardContainer = styled.div`
  display: grid;
  gap: 2vh;
  padding: 2vh 0;
  margin: 0 auto;
  max-width: 500px;

  @media (min-width: 768px) {
    gap: 3vh;
    padding: 3vh 0;
  }
`;
