import React from "react";

// MUI Imports
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// Component Imports
import PublicHeader from "../../components/public/PublicHeader";
import TeamCards from "../../components/public/TeamCards";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import { darkMode } from "../../styledcomponents/themeoptions";
import { PageTitle } from "../../styledcomponents/typography";
import {
  ThreeCardGrid,
  BackgroundBox,
} from "../../styledcomponents/containers";
// Function Import
import { FetchCardPage } from "../../services/clientFunctions";
// Query Declaration
const pageQuery = `*[_type == "teamMembers"] {city, fullName, linkedin, profilePhoto, quote, _id}`;

const Team = () => {
  const [loading, response] = FetchCardPage(pageQuery);

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
            Meet the Team
          </PageTitle>
          {loading && <LoadingIndicator />}
          <ThreeCardGrid>
            {!loading &&
              response.map((member) => {
                return <TeamCards key={member._id} member={member} />;
              })}
          </ThreeCardGrid>
          <PageFooter />
        </Container>
      </BackgroundBox>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default Team;
