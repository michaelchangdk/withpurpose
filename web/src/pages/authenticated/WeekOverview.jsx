import React, { useState, useEffect } from "react";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import { useNavigate } from "react-router-dom";
import { client } from "../../client";
import { Button } from "@mui/material";

const WeekOverview = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(null);
  const navigate = useNavigate();

  const query =
    '*[_type == "week"] { order, name, title, subtitle, liveSessionTitle, liveSessionDate}';

  useEffect(() => {
    client.fetch(query).then((response) => {
      console.log(response);
      // console.log(response.sort((a, b) => a.order - b.order));
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
          <div key={week.title}>
            {week.title}, {week.subtitle}, {week.liveSessionTitle},{" "}
            {week.liveSessionDate}
            <Button
              onClick={() => {
                navigate(`/week/${week.name}`);
              }}
            >
              {week.title}
            </Button>
          </div>
        ))}
    </>
  );
};

export default WeekOverview;
