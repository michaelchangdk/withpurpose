import React, { useEffect } from "react";
import { client } from "../../client";
import { useSelector, useDispatch } from "react-redux";
import { authenticated } from "../../reducers/authenticated";

// MUI Imports
import { Container } from "@mui/material";
// Component Imports
import HeroHeader from "../../components/authenticated/HeroHeader";
import LandingCards from "../../components/authenticated/LandingCards";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import { BackgroundBox, TwoCardGrid } from "../../styledcomponents/containers";
// Functions Import
import { FetchResponse } from "../../services/clientFunctions";
// Query Declaration

const LandingPage = () => {
  const dispatch = useDispatch();
  const userid = useSelector((store) => store.authenticated.uid);
  const pageQuery = `*[_type == "landingpage"] {_id, landingpageelements[]-> {title, headline, description, slug, coverImage, _id}}`;
  const [loading, response] = FetchResponse(pageQuery);

  const accessQuery = `*[_type == "user" && _id == "${userid}"] {approvedCommunity, approvedMasterClass, approvedMentorBooking, approvedSchool, approvedWeek0, approvedWeek1, approvedWeek23, approvedWeek4, approvedWeek5, approvedWeek6}`;
  useEffect(() => {
    client.fetch(accessQuery).then((response) => {
      console.log("access response", response);
      dispatch(
        authenticated.actions.updateAccess({
          approvedSchool: response[0].approvedSchool,
          approvedWeek0: response[0].approvedWeek0,
          approvedWeek1: response[0].approvedWeek1,
          approvedWeek23: response[0].approvedWeek23,
          approvedWeek4: response[0].approvedWeek4,
          approvedWeek5: response[0].approvedWeek5,
          approvedWeek6: response[0].approvedWeek6,
          approvedMasterClass: response[0].approvedMasterClass,
          approvedMentorBooking: response[0].approvedMentorBooking,
          approvedCommunity: response[0].approvedCommunity,
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <HeroHeader
        query={`*[_type == "landingpage"] {heroImage, title, subtitle, _id}`}
        type={"page"}
        displayName={true}
      />
      <Container maxWidth="lg">
        {loading && <LoadingIndicator />}
        <TwoCardGrid>
          {!loading &&
            response[0].landingpageelements.map((card) => (
              <LandingCards
                key={card._id}
                title={card.title}
                headline={card.headline}
                description={card.description}
                linkTo={card.slug.current}
                coverImage={card.coverImage}
              />
            ))}
        </TwoCardGrid>
        <PageFooter />
      </Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default LandingPage;
