import React from "react";

// MUI Imports
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// Component Imports
import PublicHeader from "../../components/public/PublicHeader";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// import LoadingIndicator from "../../components/global/LoadingIndicator";
// import Newsletter from "../../components/public/Newsletter";
// Styling Imports
import { darkMode } from "../../styledcomponents/themeoptions";
import { BackgroundBox } from "../../styledcomponents/globalstyles";
import { PageTitle } from "../../styledcomponents/typography";

// Comment for code coaches: This page is a feature that is not developed yet - not part of our MVP but part of the final product launch in August.
const RegistrationPage = () => {
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
          {/* {loading && <LoadingIndicator />} */}
          <PageTitle variant="h2" component="h1">
            {/* {!loading && response[0].title} */}
          </PageTitle>
          {/* {!loading && !!response[0].subtitle && (
            <PageSubtitle variant="h3" component="h2">
              {response[0].subtitle}
            </PageSubtitle>
          )} */}
          <PageFooter />
          <ScrollToTop />
        </Container>
      </BackgroundBox>
    </ThemeProvider>
  );
};

export default RegistrationPage;
