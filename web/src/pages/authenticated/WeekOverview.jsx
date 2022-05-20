import React, { useState, useEffect } from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import { client } from "../../client";
import WeekCards from "../../components/authenticated/WeekCards";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
// import { useSelector } from "react-redux";

const WeekOverview = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(null);

  // THIS IS GOING TO BE USED FOR THE PROGRESS BARS
  // let completed = useSelector((store) => store.authenticated.completedLessons);
  // let user = useSelector((store) => store.authenticated.uid)

  const weekQuery = '*[_type == "week"] ';
  // { order, name, keyword, shortDescription, title, subtitle, liveSessionTitle, liveSessionDate, _id}

  const fetchWeek = async () => {
    const fetch = await client.fetch(weekQuery);
    const response = await fetch;
    // NEED BELOW CONSOLE LOG FOR TRACKING PROGRESS - MAYBE ON WEEK CARD INSTEAD??
    // console.log(response);
    // console.log(response.map((lesson) => lesson.module));

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
