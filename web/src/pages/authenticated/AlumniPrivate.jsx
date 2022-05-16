import React from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import LandingPageHero from "../../components/authenticated/LandingPageHero";

const AlumniPrivate = () => {
  return (
    <>
      <LandingPageHero order={4} />
      <PageContainer>{/* PAGE INFORMATION */}</PageContainer>
    </>
  );
};

export default AlumniPrivate;
