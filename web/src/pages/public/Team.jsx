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
import { PageTitle, PageSubtitle } from "../../styledcomponents/typography";
import {
  ThreeCardGrid,
  BackgroundBox,
} from "../../styledcomponents/containers";
// Function Import
import { FetchResponse } from "../../services/clientFunctions";
// Query Declaration
const pageQuery = `*[_type == "teampage" && !(_id in path('drafts.**'))] {title, subtitle, _id, team[]->{city, fullName, linkedin, profilePhoto, quote, _id}}`;

const Team = () => {
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
          {!loading && !!response[0].subtitle && (
            <PageSubtitle variant="h3" component="h2">
              {response[0].subtitle}
            </PageSubtitle>
          )}
          {loading && <LoadingIndicator />}
          <ThreeCardGrid>
            {!loading &&
              response[0].team.map((member) => {
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
