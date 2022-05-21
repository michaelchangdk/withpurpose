import React, { useEffect, useState } from "react";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import { client } from "../../client";
import LandingCards from "../../components/authenticated/LandingCards";
import { PageContainer } from "../../styledcomponents/globalstyles";
import { Box } from "@mui/material";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(null);
  const query =
    '*[_type == "landingpageelements"] {order, title, headline, description, linkTo}';

  useEffect(() => {
    client.fetch(query).then((response) => {
      // console.log(response);
      // console.log(response.sort((a, b) => a.order - b.order));
      setCards(response.sort((a, b) => a.order - b.order));
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
      <HeaderAuth />
      <PageContainer>
        {!loading &&
          cards.map((card) => (
            <LandingCards
              key={card.order}
              title={card.title}
              headline={card.headline}
              description={card.description}
              linkTo={card.linkTo}
            />
          ))}
      </PageContainer>
    </Box>
  );
};

export default LandingPage;
