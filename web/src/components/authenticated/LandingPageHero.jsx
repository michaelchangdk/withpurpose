import React, { useState, useEffect } from "react";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import styled from "styled-components";
import { client } from "../../client";
import { urlFor } from "../../client";
import down from "../../assets/down.png";
import { useSelector } from "react-redux";
import { Link } from "react-scroll";
import { Container, Typography } from "@mui/material";

const LandingPageHero = ({ query, type, displayName }) => {
  const [loading, setLoading] = useState(true);
  const [heroRef, setHeroRef] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const nameArray = useSelector(
    (store) => store.authenticated.displayName
  ).split(" ");

  useEffect(() => {
    client.fetch(query).then((response) => {
      setHeroRef(response[0].heroImage.asset._ref);
      setTitle(response[0].title);
      setSubtitle(response[0].subtitle);
      setLoading(false);
    });
  }, [query]);

  return (
    <>
      <Header backgroundimage={loading ? "" : urlFor(heroRef).url()}>
        <HeaderAuth />
        <Container maxWidth="lg">
          <HeaderTitleWrapper>
            <HeaderTitle variant="h2" component="h1">
              {title}
              {displayName && ` ${nameArray[0]}`}
            </HeaderTitle>
            {!!subtitle && (
              <HeaderSubtitle variant="h4" component="h2" fontWeight={500}>
                {subtitle}
              </HeaderSubtitle>
            )}
          </HeaderTitleWrapper>
          <ButtonWrapper>
            <Link
              activeClass="active"
              className="test1"
              to="test1"
              spy={true}
              smooth={true}
              duration={500}
              offset={90}
            >
              <HeaderInstruction id="test1">
                {type === "page" && (
                  <HeaderSubtitle variant="h4" component="h3" fontWeight={400}>
                    Scroll for more
                  </HeaderSubtitle>
                )}
                {type === "week" && (
                  <HeaderSubtitle variant="h4" component="h3" fontWeight={400}>
                    Scroll to the course
                  </HeaderSubtitle>
                )}
                <HeaderIcon src={down} alt="Down arrow." />
              </HeaderInstruction>
            </Link>
          </ButtonWrapper>
        </Container>
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

  @media (min-width: 768px) {
    height: 30vh;
    min-height: 300px;
    background-position-y: center;
  }
`;

const ButtonWrapper = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

const HeaderTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20vh;

  @media (min-width: 768px) {
    padding-top: 1vh;
  }
`;

const HeaderTitle = styled(Typography)`
  && {
    color: white;
    font-size: 64px;
    padding-bottom: 12px;
    line-height: 1.2;
  }
`;

const HeaderSubtitle = styled(Typography)`
  && {
    color: white;
    font-size: 24px;
  }
`;

// const HeaderSubtitle = styled.h2`
//   font-family: "Nunito", sans-serif;
//   color: white;
//   font-size: 20px;
//   font-weight: 400;
// `;

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
