import React, { useState, useEffect } from "react";
import HeaderAuth from "../../components/authenticated/HeaderAuth";

import { client } from "../../client";
import WeekCards from "../../components/authenticated/WeekCards";

const WeekOverview = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(null);

  const query =
    '*[_type == "week"] { order, name, keyword, shortDescription, title, subtitle, liveSessionTitle, liveSessionDate}';

  useEffect(() => {
    client.fetch(query).then((response) => {
      setCards(response.sort((a, b) => a.order - b.order));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <HeaderAuth />
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
    </>
  );
};

export default WeekOverview;
