import React, { useState, useEffect } from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import PageFooter from "../../components/public/PageFooter";
import ScrollToTop from "../ScrollToTop";
import { BackgroundBox } from "../../styledcomponents/globalstyles";
import styled from "styled-components/macro";
import { PortableText } from "@portabletext/react";
import { client } from "../../client";


const OpenLetter = () => {
  const [ openLetter, setOpenLetter ] = useState(null);

  const fetchOpenLetter = async () => {
    const letterQuery = `*[_type == "openletter"]`;
    const fetch = await client.fetch(letterQuery);
    const response = await fetch;
    setOpenLetter(response[0]);
    console.log(response[0])
  };

  useEffect(() => {
    fetchOpenLetter();
  }, [])

  const myPortableTextComponents = {
    types: {
      // image: ({value}) => <InlineImg src={urlFor(value.asset._ref).url()} alt={value.asset._ref}/>,
      callToAction: ({value, isInline}) =>
        isInline ? (
          <a href={value.url}>{value.text}</a>
        ) : (
          <div className="callToAction">{value.text}</div>
        ),
    },
    block: {
      normal: ({children}) => <Typography sx={{lineHeight: "1.6"}}>{children}</Typography>,
      blockquote: ({children}) => <blockquote style={{fontSize: '18px'}}>{children}</blockquote>,
      sideblock: ({children}) => {
        return (
          <StyledAside>
            <StyledAsideTypography>{children}</StyledAsideTypography>
          </StyledAside>
        )
      }
    },
      
    marks: {
      link: ({children, value}) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <a href={value.href} rel={rel} style={{color: "#fff", textDecoration: "underline"}}>
            {children}
          </a>
        )
      },
    },
  }


  return (
    <ThemeProvider theme={darkMode}>
      <BackgroundBox
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <PublicHeader />
        <Container maxWidth="lg" sx={{mb: "32px"}}>
          <PageHeader variant="h2" component="h1" textAlign="center">
            Open letter
          </PageHeader>
          <Container maxWidth="sm">
            <PortableText
              sx={{lineHeight: 2}}
              value={openLetter?.body}
              components={myPortableTextComponents}
            />
          </Container>
        </Container>
        <PageFooter />
      </BackgroundBox>
      <ScrollToTop />
    </ThemeProvider>
  );
};

const StyledAsideTypography = styled(Typography)`
  &&{
    color: hotpink;
    width: 80%;
    left: 100px;
    font-size: 24px;
    line-height: 1.1;
    position: absolute:
  }
`;

const StyledAside = styled.aside`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 32px auto;
`


const PageHeader = styled(Typography)`
  && {
    font-size: 40px;
    margin-bottom: 24px;
  }
  @media (min-width: 768px) {
    && {
      font-size: 60px;
      padding: 0 60px;
      margin: 0 auto 32px auto;
    }
  }
`;

export default OpenLetter;

// const PageTitle = styled(Typography)`
//   && {
//     margin-bottom: 40px;
//   }

//   @media (min-width: 768px) {
//     && {
//       margin-bottom: 60px;
//     }
//   }
// `;
