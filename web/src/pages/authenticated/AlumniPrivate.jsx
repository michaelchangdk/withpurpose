import React from "react";

// MUI Imports
import { Container } from "@mui/material";
// Component Imports
import HeroHeader from "../../components/authenticated/HeroHeader";
import AlumniCards from "../../components/AlumniCards";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import {
  ThreeCardGrid,
  BackgroundBox,
} from "../../styledcomponents/containers";
// Function Import
import { FetchResponse } from "../../services/clientFunctions";
// Query Declaration
const pageQuery = `*[_type == "community" && !(_id in path('drafts.**'))] {_id, alumni[]->{fullName, city, class, linkedin, profilePhoto, _id}}`;

const AlumniPrivate = () => {
  const [loading, response] = FetchResponse(pageQuery);

  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <HeroHeader
        query={`*[_type == "community" && !(_id in path('drafts.**'))] {heroImage, title, subtitle, _id}`}
        type={"page"}
      />

      <Container maxWidth="lg" sx={{ marginTop: "32px" }}>
        {loading && <LoadingIndicator />}

        <ThreeCardGrid>
          {!loading &&
            response[0].alumni.map((student) => {
              return <AlumniCards key={student._id} alumni={student} />;
            })}
        </ThreeCardGrid>
        <PageFooter />
      </Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default AlumniPrivate;
