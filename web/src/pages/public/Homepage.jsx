import React from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Typography, Button, Stack, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import rectangle from "../../assets/decorative/rectangle.webp";
import purplesquiggle from "../../assets/decorative/scribble3.webp";
import bluesquiggle from "../../assets/decorative/scribble4.svg";
import anda from "../../assets/anda.webp";
import ioana from "../../assets/ioana.webp";
import sharuna from "../../assets/sharuna.webp";
import nsa from "../../assets/NSA1.webp";
import wta1 from "../../assets/WTA1.webp";
import wta2 from "../../assets/WTA2.webp";
import quote from "../../assets/decorative/quote.png";
import Newsletter from "../../components/public/Newsletter";
import PageFooter from "../../components/public/PageFooter";
import ScrollToTop from "../ScrollToTop";

import { BackgroundBox } from "../../styledcomponents/globalstyles";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkMode}>
      <BackgroundBox
        sx={{ bgcolor: "background.default", color: "text.primary" }}
      >
        <PublicHeader />
        <Container maxWidth="lg">
          <PageWrapper>
            <HeaderContainer>
              <StyledHeader variant="h1" fontWeight={800} fontSize={50}>
                YOUR STARTUP JOURNEY <br />
                BEGINS HERE
              </StyledHeader>
              <Header>
                <Portrait
                  src={rectangle}
                  alt="portrait of young female entrepreneur."
                />
                <Squiggle src={purplesquiggle} alt="purple squiggle." />
              </Header>
              <CTADescription>
                <div>
                  <Typography mb={2}>
                    Have a startup idea? We have the tools needed to turn it
                    into a reality.
                  </Typography>
                  <Typography mb={2}>
                    Join the 6-weeks Startup School and build your startup
                    together with other women who are based in the Nordics.
                  </Typography>
                </div>
                <CTAChild>
                  <Button
                    color="secondary"
                    variant="contained"
                    sx={{
                      width: "220px",
                      fontSize: "16px",
                      fontWeight: "700",
                      margin: "0 auto",
                    }}
                    onClick={() =>
                      window.open(
                        "https://forms.gle/ecz32R1vEStjzbWT9",
                        "_blank"
                      )
                    }
                  >
                    Register
                  </Button>
                  <Typography>
                    Our startup school is free - <BoldText>forever.</BoldText>
                  </Typography>
                </CTAChild>
              </CTADescription>
            </HeaderContainer>

            {/* STATISTICS ABOUT WOMEN IN TECH */}
            <Section>
              <Typography
                textAlign="center"
                variant="h2"
                fontWeight={700}
                fontSize={44}
              >
                Women in <PurpleText>Entrepreneurship</PurpleText>
              </Typography>
              <SectionDescription>
                <Typography sx={{ textAlign: "center" }}>
                  Women are largely underrepresented across the startup
                  ecosystem in the Nordics. Read our{" "}
                  <StyledLink onClick={() => navigate("/openletter")}>
                    Open Letter
                  </StyledLink>{" "}
                  to understand why we are doing this.
                </Typography>
              </SectionDescription>
              <ThreeGrid>
                <GridChild>
                  <OverlayParent>
                    <StyledTextOverlay variant="h2" fontWeight={700}>
                      25%
                    </StyledTextOverlay>
                    <InfoSquiggle src={bluesquiggle} />
                  </OverlayParent>
                  <Typography>
                    of founders in the Nordics are women, with numbers slightly
                    differing between each country
                  </Typography>
                </GridChild>
                <GridChild>
                  <OverlayParent>
                    <StyledTextOverlay variant="h2" fontWeight={700}>
                      2%
                    </StyledTextOverlay>
                    <InfoSquiggle src={bluesquiggle} />
                  </OverlayParent>
                  <Typography>
                    of the total available VC funding goes to female-only teams,
                    while 18% go to mixed teams & the rest to male-only founded
                    companies
                  </Typography>
                </GridChild>
                <GridChild>
                  <OverlayParent>
                    <StyledTextOverlay variant="h2" fontWeight={700}>
                      <StyledSpan>by</StyledSpan> 2023
                    </StyledTextOverlay>
                    <InfoSquiggle src={bluesquiggle} />
                  </OverlayParent>
                  <Typography>
                    our goal is to have 400 women go through the Startup School,
                    with 10% of them creating a growth company
                  </Typography>
                </GridChild>
              </ThreeGrid>
            </Section>
            {/* STARTUP SCHOOL 5 STEPS W LEARN MORE BUTTON */}
            <Section>
              <Typography
                textAlign="center"
                variant="h2"
                fontWeight={700}
                fontSize={44}
              >
                The Startup <PurpleText>School</PurpleText>
              </Typography>
              <SectionDescription>
                <Typography sx={{ textAlign: "center" }}>
                  We guide women through the early stages of starting a company.
                  From helping them select the right idea to work on, to
                  building an MVP to test with customers. All while joining a
                  community of women who are in the same startup stage.
                </Typography>
              </SectionDescription>
              <StepsContainer>
                <div>
                  <DecorativeText>BEFORE</DecorativeText>
                  <Typography fontWeight={600}>
                    Select the Right Idea to Work On & Develop a Vision for Your
                    Startup
                  </Typography>
                </div>
                <div>
                  <DecorativeText>1</DecorativeText>
                  <Typography fontWeight={600}>
                    Translate your Startup Vision Into a Business Model
                  </Typography>
                </div>
                <DecorativeText>2</DecorativeText>
                <Typography fontWeight={600}>
                  Validate the Potential of your Startup Idea
                </Typography>
                <div>
                  <DecorativeText>3</DecorativeText>
                  <Typography fontWeight={600}>
                    Build the First Possible Solution (MVP)
                  </Typography>
                </div>
                <DecorativeText>4</DecorativeText>
                <Typography fontWeight={600}>
                  Learn how to build a scalable business
                </Typography>
                <div>
                  <DecorativeText>5</DecorativeText>
                  <Typography fontWeight={600}>Review and Pitch</Typography>
                </div>
              </StepsContainer>
              <Stack alignItems="center">
                <Button
                  variant="contained"
                  color="info"
                  sx={{
                    width: "220px",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                  onClick={() => navigate("/startup-school")}
                >
                  Learn More
                </Button>
              </Stack>
            </Section>
            {/* ALUMNI TESTIMONIALS */}
            <Section>
              <Typography
                textAlign="center"
                variant="h2"
                fontWeight={700}
                fontSize={44}
              >
                Our <PurpleText>Alumni</PurpleText>
              </Typography>
              <ThreeGrid>
                <GridChild>
                  <CirclePhoto src={anda} alt="Anda-Maria Mihu" />
                  <QuoteIcon src={quote} alt="quote icon." />
                  <Typography variant="h3" fontSize={30} align="center">
                    <BlueText>Anda-Maria Mihu</BlueText>
                  </Typography>
                  <Typography align="center" sx={{ fontStyle: "italic" }}>
                    Joining With Purpose is what I needed in order to put myself
                    back on track and it gives me the support and the right
                    tools that I need for the future.
                  </Typography>
                </GridChild>
                <GridChild>
                  <CirclePhoto src={ioana} alt="Iona Gheorge" />
                  <QuoteIcon src={quote} alt="quote icon." />
                  <Typography variant="h3" fontSize={30} align="center">
                    <BlueText>Ioana Gheorghe</BlueText>
                  </Typography>
                  <Typography align="center" sx={{ fontStyle: "italic" }}>
                    What I love the most about this program is the focused and
                    hands-on approach coupled with ongoing to-the-point learning
                    materials and mentorship sessions. That, and the inspiring
                    and supportive ladies, makes WithPurpose stand out.
                  </Typography>
                </GridChild>
                <GridChild>
                  <CirclePhoto src={sharuna} alt="Sharuna Rehman" />
                  <QuoteIcon src={quote} alt="quote icon." />
                  <Typography variant="h3" fontSize={30} align="center">
                    <BlueText>Sharuna Rehman</BlueText>
                  </Typography>
                  <Typography align="center" sx={{ fontStyle: "italic" }}>
                    I must say that the program has exceeded my expectations.
                    The program does not only provide its take on how one can go
                    from idea to #business but is designed to be considerate to
                    the fact that ideas are unique and so are their hurdles.
                  </Typography>
                </GridChild>
              </ThreeGrid>
            </Section>
            {/* AWARDS SECTION */}
            <Section>
              <Typography
                textAlign="center"
                variant="h2"
                fontWeight={800}
                fontSize={44}
              >
                Part of <PurpleText>The Nordic Ecosystem</PurpleText>
              </Typography>
              <ThreeGrid>
                <GridChild>
                  <CirclePhoto src={nsa} alt="Nordic Startup Awards Nominee" />
                  <Typography textAlign="center">
                    <BoldText>Best Accelerator/Incubator Program</BoldText> in
                    Denmark for the 2021 Nordic Startup Awards
                  </Typography>
                </GridChild>
                <GridChild>
                  <CirclePhoto
                    src={wta1}
                    alt="Nordic Women in Tech Awards Nominee"
                  />
                  <Typography textAlign="center">
                    <BoldText>Initiative of the Year</BoldText> in Denmark for
                    the 2021 Nordic Women in Tech Awards
                  </Typography>
                </GridChild>
                <GridChild>
                  <CirclePhoto
                    src={wta2}
                    alt="Nordic Women in Tech Role Model Award"
                  />
                  <Typography textAlign="center">
                    The team behind With Purpose{" "}
                    <BoldText>were named Role Models of 2021</BoldText>
                  </Typography>
                </GridChild>
              </ThreeGrid>
            </Section>
            {/* CTA */}
            <Section>
              <Typography
                textAlign="center"
                variant="h2"
                fontWeight={700}
                fontSize={44}
              >
                Sign up <PurpleText>now</PurpleText>
              </Typography>
            </Section>
            {/* NEWSLETTER / REACH OUT */}
            <Section>
              <Typography
                textAlign="center"
                variant="h2"
                fontWeight={700}
                fontSize={44}
              >
                Reach <PurpleText>out</PurpleText>
              </Typography>
              <Newsletter />
            </Section>
            <PageFooter />
          </PageWrapper>
        </Container>
      </BackgroundBox>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default Homepage;

// STYLED ACROSS ENTIRE PAGE
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;

  @media (min-width: 768px) {
    padding: 0 60px;
    gap: 160px;
  }
`;

const PurpleText = styled.span`
  color: #6355d7;
`;

const BlueText = styled.span`
  color: #3d9be9;
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionDescription = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

// ALL FOR HEADER SECTION
const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr auto;
    gap: 8px;
    min-height: 300px;
  }

  @media (min-width: 1100px) {
    grid-template-columns: 1fr 1.3fr;
    gap: 2vh;
  }
`;

const StyledHeader = styled(Typography)`
  && {
    z-index: 2;
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 1;
    grid-row-end: 1;
    margin-bottom: 40px;
    align-self: flex-end;
  }

  @media (min-width: 768px) {
    && {
      grid-column-start: 1;
      grid-column-end: 3;
      align-self: flex-start;
      text-align: right;
      justify-self: flex-end;
      margin-top: 5%;
      font-size: 52px;
    }
  }

  @media (min-width: 900px) {
    && {
      font-size: 60px;
      margin-top: 80px;
    }
  }

  @media (min-width: 1100px) {
    && {
      margin-top: 100px;
      width: 100%;
      font-size: 80px;
    }
  }

  /* @media (min-width: 1240px) {
    && {
      margin-top: 140px;
      font-size: 88px;
    }
  } */
`;

const Header = styled.header`
  position: relative;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 1;
  z-index: 1;

  @media (min-width: 768px) {
    grid-column-start: 2;
    grid-column-end: 2;
    margin-bottom: 0;
  }
`;

const CTADescription = styled.div`
  @media (min-width: 768px) {
    grid-column-start: 1;
    grid-columnn-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    align-self: center;
    margin-top: 24%;
  }

  @media (min-width: 900px) {
    align-self: center;
    margin-top: 90px;
  }
`;

const CTAChild = styled.div`
  /* display: flex;
  flex-direction: row; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 0 auto;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
  }
`;

const Portrait = styled.img`
  position: absolute;
  z-index: 1;
  max-width: 80%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  right: 5%;
  height: 100%;
`;

const Squiggle = styled.img`
  width: 100%;
  height: 100%;
`;

// FOR ANY SECTION WITH 3 ELEMENTS
const ThreeGrid = styled.div`
  display: grid;
  gap: 32px;
  justify-items: center;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: calc(1200px + 6vh);
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const GridChild = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CirclePhoto = styled.img`
  border-radius: 50%;
  width: 60%;
  display: block;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 100%;
    max-width: 200px;
  }
`;

// FOR STATISTICS SECTION
const OverlayParent = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const InfoSquiggle = styled.img`
  transform: rotate(180deg);
  width: 100%;
`;

const StyledTextOverlay = styled(Typography)`
  && {
    z-index: 2;
    position: absolute;
  }
`;

const StyledLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
`;

const StyledSpan = styled.span`
  font-size: 22px;
`;

// Startup School Section
const StepsContainer = styled.div`
  width: 80%;
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DecorativeText = styled.h3`
  /* font-family: "Bungee Shade", cursive; */
  font-family: "Tourney", cursive;
  color: white;
  text-shadow: -2px 2px #6355d7;
  font-size: 44px;
`;

// Alumni Section
const QuoteIcon = styled.img`
  width: 40px;
  height: 40px;
  display: block;
  margin: 0 auto;
`;
