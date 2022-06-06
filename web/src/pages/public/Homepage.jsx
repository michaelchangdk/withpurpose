import React from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Box, Typography, Button, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import rectangle from "../../assets/decorative/rectangle.webp";
import purplesquiggle from "../../assets/decorative/scribble3.webp";
import { PageContainer } from "../../styledcomponents/globalstyles";
import bluesquiggle from "../../assets/decorative/scribble4.svg";
import anda from "../../assets/anda.webp";
import ioana from "../../assets/ioana.webp";
import sharuna from "../../assets/sharuna.webp";
import nsa from "../../assets/NSA1.webp";
import wta1 from "../../assets/WTA1.webp";
import wta2 from "../../assets/WTA2.webp";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkMode}>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          width: "100vw",
          minHeight: "100vh",
          height: "100%",
        }}
      >
        <PublicHeader />
        <PageContainer>
          <HeaderContainer>
            <Header>
              <Portrait
                src={rectangle}
                alt="portrait of young female entrepreneur."
              />
              <Squiggle src={purplesquiggle} alt="purple squiggle." />
              <StyledHeader variant="h1" fontWeight={800} fontSize={50}>
                YOUR STARTUP JOURNEY BEGINS HERE
              </StyledHeader>
            </Header>
            <div>
              <Typography mb={2}>
                Have a startup idea? We have the tools needed to turn it into a
                reality.
              </Typography>
              <Typography mb={2}>
                {" "}
                Join the 6-weeks Startup School and build your startup together
                with other women who are based in the Nordics.
              </Typography>
            </div>
            <Stack
              direction="row"
              gap={2}
              sx={{ width: "90%", margin: "0 auto" }}
              alignItems="center"
            >
              <Button
                color="secondary"
                variant="contained"
                sx={{ width: "220px", fontSize: "16px", fontWeight: "700" }}
              >
                Give it a try
              </Button>
              <Typography>Our startup school is free - forever.</Typography>
            </Stack>
          </HeaderContainer>
          {/* STATISTICS ABOUT WOMEN IN TECH */}
          <section>
            <Typography
              textAlign="center"
              variant="h2"
              fontWeight={700}
              fontSize={44}
            >
              Women in <PurpleText>Entrepreneurship</PurpleText>
            </Typography>
            <Typography>
              Women are largely underrepresented across the startup ecosystem in
              the Nordics. Read our{" "}
              <StyledLink onClick={() => navigate("/openletter")}>
                Open Letter
              </StyledLink>{" "}
              to understand why we are doing this.
            </Typography>
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
          </section>
          {/* STARTUP SCHOOL 5 STEPS W LEARN MORE BUTTON */}
          <section>
            <Typography
              textAlign="center"
              variant="h2"
              fontWeight={700}
              fontSize={44}
            >
              The Startup <PurpleText>School</PurpleText>
            </Typography>
            <Typography>
              We guide women through the early stages of starting a company.
              From helping them select the right idea to work on, to building an
              MVP to test with customers. All while joining a community of women
              who are in the same startup stage.
            </Typography>
            <DecorativeText>BEFORE</DecorativeText>
            <Typography>
              Select the Right Idea to Work On & Develop a Vision for Your
              Startup
            </Typography>
            <DecorativeText>1</DecorativeText>
            <Typography>
              Translate your Startup Vision Into a Business Model
            </Typography>
            <DecorativeText>2</DecorativeText>
            <Typography>Validate the Potential of your Startup Idea</Typography>
            <DecorativeText>3</DecorativeText>
            <Typography>Build the First Possible Solution (MVP)</Typography>
            <DecorativeText>4</DecorativeText>
            <Typography>Learn how to build a scalable business</Typography>
            <DecorativeText>5</DecorativeText>
            <Typography>Review and Pitch</Typography>
            <Button
              variant="contained"
              color="info"
              sx={{ width: "220px", fontSize: "16px", fontWeight: "700" }}
            >
              Learn More
            </Button>
          </section>
          {/* ALUMNI TESTIMONIALS */}
          <section>
            <Typography
              textAlign="center"
              variant="h2"
              fontWeight={700}
              fontSize={44}
            >
              Our <PurpleText>Alumni</PurpleText>
              <ThreeGrid>
                <GridChild>
                  <CirclePhoto src={anda} alt="Anda-Maria Mihu" />
                  <Typography>Anda-Maria Mihu</Typography>
                  <Typography>
                    Joining With Purpose is what I needed in order to put myself
                    back on track and it gives me the support and the right
                    tools that I need for the future.
                  </Typography>
                </GridChild>
                <GridChild>
                  <CirclePhoto src={ioana} alt="Iona Gheorge" />
                  <Typography>Ioana Gheorghe</Typography>
                  <Typography>
                    What I love the most about this program is the focused and
                    hands-on approach coupled with ongoing to-the-point learning
                    materials and mentorship sessions. That, and the inspiring
                    and supportive ladies, makes WithPurpose stand out.
                  </Typography>
                </GridChild>
                <GridChild>
                  <CirclePhoto src={sharuna} alt="Sharuna Rehman" />
                  <Typography>Sharuna Rehman</Typography>
                  <Typography>
                    I must say that the program has exceeded my expectations.
                    The program does not only provide its take on how one can go
                    from idea to #business but is designed to be considerate to
                    the fact that ideas are unique and so are their hurdles.
                  </Typography>
                </GridChild>
              </ThreeGrid>
            </Typography>
          </section>
          {/* AWARDS SECTION */}
          <section>
            <Typography
              textAlign="center"
              variant="h2"
              fontWeight={800}
              fontSize={44}
            >
              Part of <PurpleText>The Nordic Ecosystem</PurpleText>
              <ThreeGrid>
                <GridChild>
                  <CirclePhoto src={nsa} alt="Nordic Startup Awards Nominee" />
                  <Typography>
                    Best Accelerator/Incubator Program in Denmark for the 2021
                    Nordic Startup Awards
                  </Typography>
                </GridChild>
                <GridChild>
                  <CirclePhoto
                    src={wta1}
                    alt="Nordic Women in Tech Awards Nominee"
                  />
                  <Typography>
                    Initiative of the Year in Denmark for the 2021 Nordic Women
                    in Tech Awards
                  </Typography>
                </GridChild>
                <GridChild>
                  <CirclePhoto
                    src={wta2}
                    alt="Nordic Women in Tech Role Model Award"
                  />
                  <Typography>
                    The team behind With Purpose were named Role Models of 2021
                  </Typography>
                </GridChild>
              </ThreeGrid>
            </Typography>
          </section>
          {/* CTA */}
          <section></section>
          {/* NEWSLETTER / REACH OUT */}
          <section>
            <Typography
              textAlign="center"
              variant="h2"
              fontWeight={700}
              fontSize={44}
            >
              Reach <PurpleText>out</PurpleText>
            </Typography>
          </section>
          {/* CONTACT / SOCIALS */}
          {/* FOOTER */}
          <footer>
            <Typography>©2021 by With Purpose Ventures</Typography>
            <Typography>Supported by Global Shapers Copenhagen</Typography>
            <Typography>Copenhagen, Denmark</Typography>
          </footer>
        </PageContainer>
      </Box>
    </ThemeProvider>
  );
};

export default Homepage;

// STYLED ACROSS ENTIRE PAGE

const PurpleText = styled.span`
  color: #6355d7;
`;

// ALL FOR HEADER SECTION
const HeaderContainer = styled.div`
  display: grid;
`;

const Header = styled.header`
  position: relative;
  margin-top: 3vh;
  margin-bottom: 4vh;
`;

const Portrait = styled.img`
  position: absolute;
  z-index: 1;
  width: 80%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  right: 5%;
`;

const Squiggle = styled.img`
  width: 100%;
`;

const StyledHeader = styled(Typography)`
  && {
    z-index: 2;
    position: absolute;
    bottom: -30px;
  }

  @media (min-width: 1100px) {
    && {
      /* color: blue; */
    }
  }
`;

// FOR ANY SECTION WITH 3 ELEMENTS
const ThreeGrid = styled.div`
  /* position: relative; */
`;

const OverlayParent = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const GridChild = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const InfoSquiggle = styled.img`
  transform: rotate(180deg);
  width: 100%;
  /* width: 40%; */
  /* position: absolute; */
`;

const StyledTextOverlay = styled(Typography)`
  && {
    z-index: 2;
    position: absolute;
  }
`;

const CirclePhoto = styled.img`
  border-radius: 50%;
  width: 60%;
`;

// FOR STATISTICS SECTION
const StyledLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
`;

const StyledSpan = styled.span`
  font-size: 22px;
`;

// Startup School Section
const DecorativeText = styled.h3`
  /* font-family: "Bungee Shade", cursive; */
  font-family: "Tourney", cursive;
  color: white;
  text-shadow: -2px 2px #6355d7;
  font-size: 44px;
  text-align: center;
`;

// Alumni Section

// Nordic Ecosystem Section
