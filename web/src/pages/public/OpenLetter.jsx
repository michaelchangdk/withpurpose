import React from "react";
import { PortableText } from "@portabletext/react";
import { useNavigate } from "react-router-dom";

// MUI Imports
import { Container, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// Component Imports
import PublicHeader from "../../components/public/PublicHeader";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import { darkMode } from "../../styledcomponents/themeoptions";
import { BackgroundBox, Flexbox } from "../../styledcomponents/globalstyles";
import { PageTitle, PageSubtitle } from "../../styledcomponents/typography";
import myPortableTextComponents from "../../styledcomponents/myPortableTextComponents";
// Function Import
import { FetchResponse } from "../../services/clientFunctions";
// Query Declaration
const pageQuery = `*[_type == "openletter"] {title, subtitle, body, _id}`;

const OpenLetter = () => {
  const navigate = useNavigate();
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
            <Flexbox style={{ justifyContent: "center", marginTop: "32px" }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  width: "180px",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
                onClick={() => navigate("/contact")}
              >
                Join us
              </Button>
            </Flexbox>
          </Container>
        </Container>
        <PageFooter />
      </BackgroundBox>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default OpenLetter;
