import React, { useState, useEffect } from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import styled from "styled-components";
import { client } from "../../client";
import WeekCards from "../../components/authenticated/WeekCards";
import LandingPageHero from "../../components/authenticated/LandingPageHero";

const WeekOverview = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(null);

  const weekQuery =
    '*[_type == "week"] { order, name, keyword, shortDescription, title, subtitle, liveSessionTitle, liveSessionDate, _id}';

  const fetchWeek = async () => {
    const fetch = await client.fetch(weekQuery);
    const response = await fetch;
    console.log(response);
    // WE NEED TO MAKE SURE DRAFTS DON'T GET ADDED TO THE ARRAY! USE THE BELOW CODE IN IDS!
    let published = response.filter((a) => !a._id.includes("draft"));
    setCards(published.sort((a, b) => a.order - b.order));
    setLoading(false);
  };

  useEffect(() => {
    fetchWeek();
  }, []);

  return (
    <>
      <LandingPageHero order={1} />
      <PageContainer>
        {loading && <p>loading</p>}
        {/* use "name" for useNavigate */}
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
            />
          ))}
      </PageContainer>
    </>
  );
};

export default WeekOverview;
