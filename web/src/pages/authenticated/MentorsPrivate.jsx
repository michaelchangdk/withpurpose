import React from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import LandingPageHero from "../../components/authenticated/LandingPageHero";

const MentorsPrivate = () => {
  return (
    <>
      <LandingPageHero order={3} />
      <PageContainer>{/* PAGE INFORMATION */}</PageContainer>
    </>
  );
};

export default MentorsPrivate;
