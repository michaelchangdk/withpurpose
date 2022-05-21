import React, { useState, useEffect } from "react";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import styled from "styled-components";
import { client } from "../../client";
import { urlFor } from "../../client";
import down from "../../assets/down.png";
import { PageContainer } from "../../styledcomponents/globalstyles";
import { useSelector } from "react-redux";

const LandingPageHero = ({ query, displaySubtitle, type, displayName }) => {
  const [loading, setLoading] = useState(true);
  const [heroRef, setHeroRef] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const nameArray = useSelector(
    (store) => store.authenticated.displayName
  ).split(" ");

  const fetchHero = async () => {
    const fetch = await client.fetch(query);
    const response = await fetch;
    setHeroRef(response[0].heroImage.asset._ref);
    setTitle(response[0].title);
    setSubtitle(response[0].subtitle);
    setLoading(false);
  };

  useEffect(() => {
    fetchHero();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      <Header backgroundimage={loading ? "" : urlFor(heroRef).url()}>
        <HeaderAuth />
        <PageContainer>
          <HeaderTitleWrapper>
            <HeaderTitle>
              {title}
              {displayName && ` ${nameArray[0]}`}
            </HeaderTitle>
            {displaySubtitle === true && (
              <HeaderSubtitle>{subtitle}</HeaderSubtitle>
            )}
          </HeaderTitleWrapper>
          <HeaderInstruction>
            {type === "page" && (
              <HeaderSubtitle>Scroll for more</HeaderSubtitle>
            )}
            {type === "week" && (
              <HeaderSubtitle>Scroll to the course</HeaderSubtitle>
            )}
            <HeaderIcon src={down} alt="down arrow." />
          </HeaderInstruction>
        </PageContainer>
      </Header>
    </>
  );
};

export default LandingPageHero;

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
