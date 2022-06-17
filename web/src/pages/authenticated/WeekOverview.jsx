import React from "react";
import ReactPlayer from "react-player";

// MUI Imports
import { Container } from "@mui/material";
// Component Imports
import HeroHeader from "../../components/authenticated/HeroHeader";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import WeekCards from "../../components/authenticated/WeekCards";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import {
  BackgroundBox,
  FrameDiv,
  TwoCardGrid,
} from "../../styledcomponents/containers";
// Function Imports
import { FetchResponse } from "../../services/clientFunctions";
// Query Declaration
const pageQuery = `*[_type == "startupschool"] {introVideo, _id, weeks[]-> {order, name, keyword, shortDescription, title, subtitle, liveSessionTitle, liveSessionDate, _id, module}}`;

const WeekOverview = () => {
  const [loading, response] = FetchResponse(pageQuery);

  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <HeroHeader
        query={`*[_type == "startupschool"] {heroImage, title, subtitle, _id}`}
        type={"page"}
      />
      <Container maxWidth="lg" sx={{ marginTop: "32px" }}>
        {loading && <LoadingIndicator />}
        {!loading && response[0].introVideo.length > 0 && (
          <FrameDiv>
            <ReactPlayer
              url={response[0].introVideo}
              controls={true}
              width="100%"
              height="100%"
              className="react-player"
            />
          </FrameDiv>
        )}
        <TwoCardGrid>
          {!loading &&
            response[0].weeks.map((week) => (
              <WeekCards
                key={week.title}
                name={week.name}
                title={week.title}
                keyword={week.keyword}
                shortDescription={week.shortDescription}
                liveSessionTitle={week.liveSessionTitle}
                liveSessionDate={week.liveSessionDate}
                module={week.module}
              />
            ))}
        </TwoCardGrid>
        <PageFooter />
      </Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default WeekOverview;
