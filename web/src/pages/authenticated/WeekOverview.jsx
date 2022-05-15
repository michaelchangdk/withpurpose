import React, { useState, useEffect } from "react";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import { PageContainer } from "../../styledcomponents/globalstyles";
import styled from "styled-components";
import { client } from "../../client";
import { urlFor } from "../../client";
import WeekCards from "../../components/authenticated/WeekCards";
import down from "../../assets/down.png";

const WeekOverview = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState(null);
  const [heroRef, setHeroRef] = useState("");
  const [title, setTitle] = useState("");

  const weekQuery =
    '*[_type == "week"] { order, name, keyword, shortDescription, title, subtitle, liveSessionTitle, liveSessionDate, _id}';

  const fetchWeek = async () => {
    const fetch = await client.fetch(weekQuery);
    const response = await fetch;
    // WE NEED TO MAKE SURE DRAFTS DON'T GET ADDED TO THE ARRAY! USE THE BELOW CODE IN IDS!
    let published = response.filter((a) => !a._id.includes("draft"));
    setCards(published.sort((a, b) => a.order - b.order));
  };

  const pageQuery =
    '*[_type == "landingpage" && order == 1] {order, title, headline, description, linkTo, heroImage}';

  const fetchPage = async () => {
    const fetch = await client.fetch(pageQuery);
    const response = await fetch;
    setHeroRef(response[0].heroImage.asset._ref);
    setTitle(response[0].title);
    setLoading(false);
  };

  const fetchAll = async () => {
    await fetchWeek();
    await fetchPage();
  };

  useEffect(() => {
    fetchAll();
  }, [loading]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <Header backgroundimage={urlFor(heroRef).url()}>
            <HeaderAuth />
            <PageContainer>
              <HeaderTitleWrapper>
                <HeaderTitle>{title}</HeaderTitle>
              </HeaderTitleWrapper>
              <HeaderInstruction>
                <HeaderSubtitle>Scroll for more</HeaderSubtitle>
                <HeaderIcon src={down} alt="down arrow." />
              </HeaderInstruction>
            </PageContainer>
          </Header>
          <PageContainer>
            {/* use "name" for useNavigate */}
            {cards.map((week) => (
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
      )}
    </>
  );
};

export default WeekOverview;

const Header = styled.header`
  width: 100vw;
  height: 100vh;
  background-image: url(${(props) => props.backgroundimage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
`;

const HeaderTitle = styled.h1`
  color: white;
  font-size: 64px;
  padding-bottom: 10px;
`;

const HeaderSubtitle = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: 300;
`;

const HeaderTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20vh;
`;

const HeaderInstruction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin-bottom: 2vh;
  gap: 1vh;
`;

const HeaderIcon = styled.img`
  width: 20px;
  height: 20px;
`;
