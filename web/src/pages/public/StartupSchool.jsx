import React from "react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../client";

// MUI Imports
import { Container, Typography } from "@mui/material";
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
// Function import
import { FetchResponse } from "../../services/clientFunctions";
// Query Declaration
const pageQuery = `*[_type == "startupschoolinfo"] {title, subtitle, _id, intro, expectations, threeColumns, blockOne, paragraphOne, blockTwo, paragraphTwo}`;

const StartupSchool = () => {
  const [loading, response] = FetchResponse(pageQuery);

  const myPortableTextComponents = {
    types: {
      // image: ({value}) => <InlineImg src={urlFor(value.asset._ref).url()} alt={value.asset._ref}/>,
      callToAction: ({ value, isInline }) =>
        isInline ? (
          <a href={value.url}>{value.text}</a>
        ) : (
          <div className="callToAction">{value.text}</div>
        ),
    },
    block: {
      normal: ({ children }) => (
        <Typography sx={{ lineHeight: "1.6" }}>{children}</Typography>
      ),
      blockquote: ({ children }) => (
        <blockquote style={{ fontSize: "18px" }}>{children}</blockquote>
      ),
      sideblock: ({ children }) => {
        return (
          <StyledAside>
            <StyledAsideTypography>{children}</StyledAsideTypography>
          </StyledAside>
        );
      },
    },

    marks: {
      link: ({ children, value }) => {
        const rel = !value.href.startsWith("/")
          ? "noreferrer noopener"
          : undefined;
        return (
          <a
            href={value.href}
            rel={rel}
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            {children}
          </a>
        );
      },
    },
  };

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
          <ContentWrapper>
            <div>
              <PortableText
                sx={{ lineHeight: 2 }}
                value={response[0]?.intro}
                components={myPortableTextComponents}
              />
            </div>
            <div>
              <PortableText
                sx={{ lineHeight: 2 }}
                value={response[0]?.expectations}
                components={myPortableTextComponents}
              />
            </div>
            <ThreeGrid>
              {!loading &&
                response[0].threeColumns.map((column) => (
                  <div key={column.title}>
                    <Typography>{column.title}</Typography>
                    <Typography>{column.description}</Typography>
                  </div>
                ))}
            </ThreeGrid>
            <TwoGrid>
              <TwoBlock>
                {!loading &&
                  response[0].blockOne.map((block) => (
                    <div key={block.title}>
                      <Icon
                        src={urlFor(block.image.asset._ref).url()}
                        alt={block.title}
                      />
                      <Typography>{block.title}</Typography>
                      <Typography>{block.description}</Typography>
                    </div>
                  ))}
              </TwoBlock>
              <div style={{ listStylePosition: "inside", lineHeight: 2 }}>
                <PortableText
                  sx={{ lineHeight: 2 }}
                  value={response[0]?.paragraphOne}
                  components={myPortableTextComponents}
                />
              </div>
            </TwoGrid>
            <TwoGrid>
              <div>
                <PortableText
                  sx={{ lineHeight: 2 }}
                  value={response[0]?.paragraphTwo}
                  components={myPortableTextComponents}
                />
              </div>
              <TwoBlock>
                {!loading &&
                  response[0].blockTwo.map((block) => (
                    <div key={block.title}>
                      <Icon
                        src={urlFor(block.image.asset._ref).url()}
                        alt={block.title}
                      />
                      <Typography>{block.title}</Typography>
                      <Typography>{block.description}</Typography>
                    </div>
                  ))}
              </TwoBlock>
            </TwoGrid>
          </ContentWrapper>
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
  gap: 40px;
  padding: 0 60px;
`;

const StyledAsideTypography = styled(Typography)`
  && {
    color: hotpink;
    width: 80%;
    left: 100px;
    font-size: 24px;
    line-height: 1.1;
  }
`;

const StyledAside = styled.aside`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 32px auto;
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

const Icon = styled.img`
  width: 60%;
  max-width: 528px;
`;
