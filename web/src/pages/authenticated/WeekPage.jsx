import React, { useEffect, useState } from "react";
import { client } from "../../client";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// MUI Imports
import { Stack, Button, Container } from "@mui/material";
// Component Imports
import HeroHeader from "../../components/authenticated/HeroHeader";
import ModuleCards from "../../components/authenticated/ModuleCards";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import {
  BackgroundBox,
  DescriptionContainer,
  DescriptionChild,
  DescriptionTypography,
  OneCardGrid,
} from "../../styledcomponents/containers";
// Functions Import
import { FetchResponse } from "../../services/clientFunctions";

const WeekPage = () => {
  const [allWeeks, setAllWeeks] = useState([]);
  const { week } = useParams();
  const navigate = useNavigate();
  const weekAccess = Object.entries(
    useSelector((store) => store.authenticated.access)
  ).filter(([key, val]) => key.includes("Week"));

  // Fetching the page
  const pageQuery = `*[_type == "week" && name == "${week}"] {description, module[]->, order, _id}`;
  const [loading, response] = FetchResponse(pageQuery);

  useEffect(() => {
    if (!loading) {
      setAccess(response[0].order);
    }
  });

  // For disabling next week access
  const [disabled, setDisabled] = useState();
  const setAccess = (order) => {
    if (weekAccess[order]) {
      const nextWeekAccess = weekAccess[order][1];
      setDisabled(nextWeekAccess);
    } else {
      return;
    }
  };

  // For navigating between weeks
  useEffect(() => {
    const weeksQuery = `*[_type == "week"] {name, order}`;
    client.fetch(weeksQuery).then((res) => {
      setAllWeeks(res.sort((a, b) => a.order - b.order));
    });
  }, []);

  const previousWeek = () => {
    navigate(`/week/${allWeeks[response[0].order - 2].name}`);
    window.location.reload();
  };
  const nextWeek = () => {
    navigate(`/week/${allWeeks[response[0].order].name}`);
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
          <HeroHeader
            query={`*[_type == "week" && name == "${week}"] {heroImage, title, subtitle, _id}`}
            type={"week"}
          />
          <DescriptionContainer backgroundcolor="#e93a7d">
            <DescriptionChild>
              <DescriptionTypography>
                {response[0].description}
              </DescriptionTypography>
            </DescriptionChild>
          </DescriptionContainer>
          <Container maxWidth="lg">
            {loading && <p>Loading...</p>}
            <OneCardGrid>
              {!loading &&
                response[0].module.map((module) => (
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
                justifyContent={
                  response[0].order === 1 ? "flex-end" : "space-between"
                }
              >
                {response[0].order !== 1 && (
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

                {response[0].order !== 6 && (
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
            </OneCardGrid>
            <ScrollToTop />
            <PageFooter />
          </Container>
        </>
      )}
    </BackgroundBox>
  );
};

export default WeekPage;
