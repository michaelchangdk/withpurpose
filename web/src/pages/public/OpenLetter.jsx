import React from "react";
import { PortableText } from "@portabletext/react";

// MUI Imports
import { Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// Component Imports
import PublicHeader from "../../components/public/PublicHeader";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import styled from "styled-components/macro";
import { darkMode } from "../../styledcomponents/themeoptions";
import { BackgroundBox } from "../../styledcomponents/globalstyles";
import { PageTitle, PageSubtitle } from "../../styledcomponents/typography";
// Function Import
import { FetchResponse } from "../../services/clientFunctions";
// Query Declaration
const pageQuery = `*[_type == "openletter"] {title, subtitle, body, _id}`;

const OpenLetter = () => {
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
          <PageTitle variant="h2" component="h1">
            {!loading && response[0].title}
          </PageTitle>
          {!loading && !!response[0].title.subtitle && (
            <PageSubtitle variant="h3" component="h2">
              {response[0].subtitle}
            </PageSubtitle>
          )}
          <Container maxWidth="sm">
            {loading && <LoadingIndicator />}
            {!loading && (
              <PortableText
                sx={{ lineHeight: 2 }}
                value={response[0]?.body}
                components={myPortableTextComponents}
              />
            )}
          </Container>
        </Container>
        <PageFooter />
      </BackgroundBox>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default OpenLetter;

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
