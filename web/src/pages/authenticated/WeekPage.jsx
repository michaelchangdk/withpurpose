import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// MUI Imports
import { Stack, Button, Container } from "@mui/material";
// Component Imports
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import ModuleCards from "../../components/authenticated/ModuleCards";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import styled from "styled-components/macro";
import {
  BackgroundBox,
  DescriptionContainer,
  DescriptionChild,
  DescriptionTypography,
} from "../../styledcomponents/containers";

const WeekPage = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [weekOrder, setWeekOrder] = useState();
  const [allWeeks, setAllWeeks] = useState([]);
  const { week } = useParams();
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();
  const weekAccess = Object.entries(
    useSelector((store) => store.authenticated.access)
  ).filter(([key, val]) => key.includes("Week"));

  // USE THESE TO DETERMINE ACCESS AND SET NAVIGATION BUTTON COLORS
  const [disabled, setDisabled] = useState();
  const setAccess = (order) => {
    if (weekAccess[order]) {
      const nextWeekAccess = weekAccess[order][1];
      setDisabled(nextWeekAccess);
    } else {
      return;
    }
  };

  const fetchPage = async () => {
    setLoading(true);
    const weekQuery = `*[_type == "week" && name == "${week}"] {description, module[]->, order}`;
    const fetch = await client.fetch(weekQuery);
    const response = await fetch;
    setDescription(response[0].description);
    setWeekOrder(response[0].order);
    setAccess(response[0].order);
    setModules(response[0].module);
    setLoading(false);
  };

  const fetchNavigation = async () => {
    setLoading(true);
    const weeksQuery = `*[_type == "week"] {name, order}`;
    const fetch = await client.fetch(weeksQuery);
    const response = await fetch;
    setAllWeeks(response.sort((a, b) => a.order - b.order));
    setLoading(false);
  };

  const fetchAll = async () => {
    await fetchPage();
    await fetchNavigation();
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const previousWeek = () => {
    navigate(`/week/${allWeeks[weekOrder - 2].name}`);
    window.location.reload();
  };

  const nextWeek = () => {
    navigate(`/week/${allWeeks[weekOrder].name}`);
    window.location.reload();
  };

  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {loading && <LoadingIndicator />}
      {!loading && (
        <>
          <LandingPageHero
            query={`*[_type == "week" && name == "${week}"]`}
            type={"week"}
            displaySubtitle={true}
          />
          <DescriptionContainer backgroundcolor="#e93a7d">
            <DescriptionChild>
              <DescriptionTypography>{description}</DescriptionTypography>
            </DescriptionChild>
          </DescriptionContainer>
          <Container maxWidth="lg">
            {loading && <p>Loading...</p>}
            <CardContainer>
              {!loading &&
                modules.map((module) => (
                  <ModuleCards
                    key={module.title}
                    duration={module.duration}
                    name={module.name}
                    title={module.title}
                    type={module.type}
                    module={module}
                  />
                ))}
              <Stack
                direction="row"
                justifyContent={weekOrder === 1 ? "flex-end" : "space-between"}
              >
                {weekOrder !== 1 && (
                  <Button
                    variant="contained"
                    sx={{ width: 140, height: 36 }}
                    size="small"
                    color="primary"
                    onClick={() => previousWeek()}
                    disableElevation
                  >
                    Previous week
                  </Button>
                )}

                {weekOrder !== 6 && (
                  <Button
                    variant="contained"
                    sx={{ width: 140, height: 36 }}
                    size="small"
                    color="primary"
                    onClick={() => nextWeek()}
                    disableElevation
                    disabled={!disabled}
                  >
                    {!disabled ? "Coming soon" : "Next week"}
                  </Button>
                )}
              </Stack>
            </CardContainer>
            <ScrollToTop />
            <PageFooter />
          </Container>
        </>
      )}
    </BackgroundBox>
  );
};

export default WeekPage;

const CardContainer = styled.div`
  display: grid;
  gap: 32px;
  padding-top: 32px;
  margin: 0 auto;
`;
