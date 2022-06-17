import React from "react";

// MUI Imports
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
// Component Imports
import PublicHeader from "../../components/public/PublicHeader";
import AlumniCards from "../../components/AlumniCards";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import { darkMode } from "../../styledcomponents/themeoptions";
import { PageTitle, PageSubtitle } from "../../styledcomponents/typography";
import {
  ThreeCardGrid,
  BackgroundBox,
} from "../../styledcomponents/containers";
// Function Import
import { FetchResponse } from "../../services/clientFunctions";
// Query Declaration
const pageQuery = `*[_type == "alumnipage"] {title, subtitle, _id, alumni[]->{fullName, city, class, linkedin, profilePhoto, _id}}`;

const AlumniPublic = () => {
  const [loading, response] = FetchResponse(pageQuery);

  return (
    <ThemeProvider theme={darkMode}>
      <BackgroundBox
        sx={{ bgcolor: "background.default", color: "text.primary" }}
      >
        <PublicHeader />
        <Container maxWidth="lg">
          <PageTitle variant="h2" component="h1">
            {!loading && response[0].title}
          </PageTitle>
          <PageSubtitle variant="h3" component="h2">
            {!loading && !!response[0].subtitle && response[0].subtitle}
          </PageSubtitle>
          {loading && <LoadingIndicator />}
          <ThreeCardGrid>
            {!loading &&
              response[0].alumni.map((student) => {
                return <AlumniCards key={student._id} alumni={student} />;
              })}
            {/* PAGE INFORMATION */}
          </ThreeCardGrid>
          <PageFooter />
        </Container>
      </BackgroundBox>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default AlumniPublic;
