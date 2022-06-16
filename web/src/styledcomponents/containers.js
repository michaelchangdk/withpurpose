import styled from "styled-components/macro";
import { Box, Typography, Container } from "@mui/material";

// All Pages
export const BackgroundBox = styled(Box)`
  && {
    width: 100%;
    min-height: 100vh;
    height: 100%;
  }
`;

// Two Grid for WeekOverview and LandingPage components
export const TwoCardGrid = styled.div`
  display: grid;
  justify-items: center;
  gap: 32px;
  padding-top: 32px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

// Three Grid - used in Team, Alumni, and Company Mentors
export const ThreeCardGrid = styled.div`
  display: grid;
  gap: 32px;
  margin: 0 auto;
  justify-content: center;

  @media (min-width: 768px) {
    max-width: 782px;
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1100px) {
    max-width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

// Aspect Ratio Containers - used for landingpagecard images
export const AspectRatioBox = styled.div`
  height: 0;
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
`;

export const AspectRatioChild = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.backgroundimage});
  background-position-x: ${(props) => props.xposition * 100}%;
  background-position-y: ${(props) => props.yposition * 100}%;
  background-repeat: no-repeat;
  background-size: cover;
`;

// Colored Description Containers - used in Mentorpage, Mentorbooking, WeekPage, and ModulePage
export const DescriptionContainer = styled.div`
  background-color: ${(props) => props.backgroundcolor};
  color: white;
  white-space: pre-line;
  vertical-align: bottom;
`;

export const DescriptionChild = styled(Container)`
  && {
    padding: 48px 84px;
  }
`;

export const DescriptionTypography = styled(Typography)`
  /* && {
  } */

  @media (min-width: 768px) {
    && {
      font-size: 18px;
      line-height: 1.6;
    }
  }
`;

// Divs for Video Embeds - Startup School Page & LessonList component
export const FrameDiv = styled.div`
  position: relative;
  padding-top: 56.25%;
  border-radius: 4px;
  overflow: hidden;
`;
