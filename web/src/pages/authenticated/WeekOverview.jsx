import React, { useState, useEffect } from "react";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import { PageContainer } from "../../styledcomponents/globalstyles";

import { client } from "../../client";
import WeekCards from "../../components/authenticated/WeekCards";

const WeekOverview = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(null);

  const query =
    '*[_type == "week"] { order, name, keyword, shortDescription, title, subtitle, liveSessionTitle, liveSessionDate, _id}';

  useEffect(() => {
    client.fetch(query).then((response) => {
      console.log(response);
      // WE NEED TO MAKE SURE DRAFTS DON'T GET ADDED TO THE ARRAY! USE THE BELOW CODE IN IDS!
      let published = response.filter((a) => !a._id.includes("draft"));
      console.log(published);
      setCards(published.sort((a, b) => a.order - b.order));
      setLoading(false);
    });
  }, []);

  console.log(cards);

  return (
    <>
      <HeaderAuth />
      <PageContainer>
        {/* use "name" for useNavigate */}
        Week Overview
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
