import React, { useState, useEffect } from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import { client } from "../../client";
import WeekCards from "../../components/authenticated/WeekCards";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { Box } from "@mui/material";

const WeekOverview = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(null);

  // For setting the week cards
  const weekQuery =
    '*[_type == "week"] {order, name, keyword, shortDescription, title, subtitle, liveSessionTitle, liveSessionDate, _id, module}';

  useEffect(() => {
    client.fetch(weekQuery).then((response) => {
      let published = response.filter((a) => !a._id.includes("draft"));
      setCards(published.sort((a, b) => a.order - b.order));
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
        query={`*[_type == "landingpageelements" && order == 1] {heroImage, title, subtitle}`}
        type={"page"}
      />
      <PageContainer>
        {loading && <p>loading</p>}
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
      </PageContainer>
    </Box>
  );
};

export default WeekOverview;
