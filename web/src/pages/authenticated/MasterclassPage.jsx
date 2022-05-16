import React from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import LandingPageHero from "../../components/authenticated/LandingPageHero";

const MasterclassPage = () => {
  return (
    <>
      <LandingPageHero order={2} />
      <PageContainer>{/* PAGE INFORMATION */}</PageContainer>
    </>
  );
};

export default MasterclassPage;
