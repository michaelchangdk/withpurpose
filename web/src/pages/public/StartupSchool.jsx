import React from "react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../client";

// MUI Imports
import { Container, Typography, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// Component Imports
import PublicHeader from "../../components/public/PublicHeader";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
import LoadingIndicator from "../../components/global/LoadingIndicator";
// Styling Imports
import styled from "styled-components/macro";
import { darkMode } from "../../styledcomponents/themeoptions";
import { BackgroundBox } from "../../styledcomponents/globalstyles";
import { PageTitle, PageSubtitle } from "../../styledcomponents/typography";
import myPortableTextComponents from "../../styledcomponents/myPortableTextComponents";
// Function import
import { FetchResponse } from "../../services/clientFunctions";
// Query Declaration
const pageQuery = `*[_type == "startupschoolinfo"] {title, subtitle, _id, intro, cta, expectationsHeader, expectations, threeColumns, blockOne, paragraphOne, blockTwo, paragraphTwo}`;

const StartupSchool = () => {
  const [loading, response] = FetchResponse(pageQuery);

  return (
    <ThemeProvider theme={darkMode}>
      <BackgroundBox
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <PublicHeader />
        <Container maxWidth="lg">
          {loading && <LoadingIndicator />}
          <PageTitle variant="h2" component="h1">
            {!loading && response[0].title}
          </PageTitle>
          {!loading && !!response[0].subtitle && (
            <PageSubtitle variant="h3" component="h2">
              {response[0].subtitle}
            </PageSubtitle>
          )}
          {!loading && (
            <ContentWrapper>
              <div>
                <PortableText
                  sx={{ lineHeight: 2 }}
                  value={response[0]?.intro}
                  components={myPortableTextComponents}
                />
              </div>
              <div
                style={{
                  margin: "0 auto",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <StyledCTA variant="h2">
                  {response[0].cta.substring(
                    0,
                    response[0].cta.lastIndexOf(" ")
                  )}
                  <PurpleSpan>
                    {" "}
                    {response[0].cta.split(" ").slice(-1)}
                  </PurpleSpan>
                </StyledCTA>

                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  sx={{
                    width: "220px",
                    fontSize: "18px",
                    fontWeight: "700",
                    margin: "0 auto",
                  }}
                  onClick={() =>
                    window.open("https://forms.gle/ecz32R1vEStjzbWT9", "_blank")
                  }
                >
                  Register
                </Button>
              </div>

              <div>
                <PurpleSubheader variant="h4">
                  {response[0].expectationsHeader}
                </PurpleSubheader>
                <PortableText
                  sx={{ lineHeight: 2 }}
                  value={response[0]?.expectations}
                  components={myPortableTextComponents}
                />
              </div>

              <ThreeGrid>
                {response[0].threeColumns.map((column) => (
                  <GridChild key={column.title}>
                    <PurpleSubheader variant="h4">
                      {column.title}
                    </PurpleSubheader>
                    <Typography>{column.description}</Typography>
                  </GridChild>
                ))}
              </ThreeGrid>
              <TwoGrid>
                <TwoBlock>
                  {response[0].blockOne.map((block) => (
                    <GridChild key={block.title}>
                      <Icon
                        src={urlFor(block.image.asset._ref).url()}
                        alt={block.title}
                      />
                      <PinkSubheader variant="h2">{block.title}</PinkSubheader>
                      <Typography
                        variant="h5"
                        fontWeight={500}
                        sx={{ fontSize: "16px" }}
                      >
                        {block.description}
                      </Typography>
                    </GridChild>
                  ))}
                </TwoBlock>
                <div
                  style={{
                    listStylePosition: "outside",
                    paddingLeft: "1em",
                    lineHeight: 1.5,
                  }}
                >
                  <PortableText
                    sx={{ lineHeight: 2 }}
                    value={response[0]?.paragraphOne}
                    components={myPortableTextComponents}
                  />
                </div>
              </TwoGrid>
              <TwoGrid>
                {!loading && (
                  <GridRight>
                    <TwoBlock>
                      {response[0].blockTwo.map((block) => (
                        <GridChild key={block.title}>
                          <Icon
                            src={urlFor(block.image.asset._ref).url()}
                            alt={block.title}
                          />
                          <PinkSubheader variant="h2">
                            {block.title}
                          </PinkSubheader>
                          <Typography
                            variant="h5"
                            fontWeight={500}
                            sx={{ fontSize: "16px" }}
                          >
                            {block.description}
                          </Typography>
                        </GridChild>
                      ))}
                    </TwoBlock>
                  </GridRight>
                )}
                <GridLeft>
                  <PortableText
                    sx={{ lineHeight: 2 }}
                    value={response[0]?.paragraphTwo}
                    components={myPortableTextComponents}
                  />
                </GridLeft>
              </TwoGrid>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                sx={{
                  width: "220px",
                  fontSize: "18px",
                  fontWeight: "700",
                  margin: "-16px auto 0 auto",
                }}
                onClick={() =>
                  window.open("https://forms.gle/ecz32R1vEStjzbWT9", "_blank")
                }
              >
                APPLY NOW
              </Button>
            </ContentWrapper>
          )}
        </Container>
        <PageFooter />
      </BackgroundBox>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default StartupSchool;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;

  @media (min-width: 768px) {
    padding: 0 60px;
  }
`;

const ThreeGrid = styled.div`
  display: grid;
  gap: 32px;
  margin: 0 auto;
  justify-content: center;
  text-align: center;

  @media (min-width: 768px) {
    max-width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const TwoBlock = styled.div`
  display: grid;
  gap: 32px;
  margin: 0 auto;
  justify-content: center;
  text-align: center;
  grid-template-columns: 1fr 1fr;
`;

const TwoGrid = styled.div`
  display: grid;
  gap: 32px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  /* text-align: center; */

  @media (min-width: 768px) {
    max-width: 100%;
    grid-template-columns: 1fr 1fr;
  }
`;

const GridChild = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const GridLeft = styled.div`
  @media (min-width: 768px) {
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 1;
    grid-row-end: 1;
  }
`;

const GridRight = styled.div`
  @media (min-width: 768px) {
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 1;
  }
`;

const Icon = styled.img`
  width: 60%;
  max-width: 528px;
`;

// Typography Styling
const PurpleSubheader = styled(Typography)`
  && {
    color: #6356d7;
    font-weight: 600;
  }
`;

const PinkSubheader = styled(Typography)`
  && {
    color: #e93a7d;
    font-size: 20px;
  }

  @media (min-width: 1100px) {
    && {
      font-size: 24px;
    }
  }
`;

const StyledCTA = styled(Typography)`
  && {
    font-size: 36px;
  }

  @media (min-width: 768px) {
    && {
      font-size: 52px;
    }
  }
`;

const PurpleSpan = styled.span`
  color: #6356d7;
`;
