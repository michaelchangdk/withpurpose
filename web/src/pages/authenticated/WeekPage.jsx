import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import ModuleCards from "../../components/authenticated/ModuleCards";
import styled from "styled-components";
import { Stack, Button, Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import { useSelector } from "react-redux";
import ScrollToTop from "../ScrollToTop";
import LoadingIndicator from "../../components/LoadingIndicator";

const WeekPage = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [weekOrder, setWeekOrder] = useState();
  const [allWeeks, setAllWeeks] = useState([]);
  const { week } = useParams();
  let modulesArray = [];
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();
  let moduleQueries = [];
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

  const fetchModuleRefs = async () => {
    setLoading(true);
    const weekQuery = `*[_type == "week" && name == "${week}"] {description, module, order}`;
    const fetch = await client.fetch(weekQuery);
    const response = await fetch;
    setDescription(response[0].description);
    setWeekOrder(response[0].order);
    setAccess(response[0].order);
    moduleQueries = response[0].module.map(
      (module) => `*[_type == "module" && _id == "${module._ref}"]`
    );
    setLoading(false);
  };

  const fetchModules = async () => {
    setLoading(true);
    await Promise.all(
      moduleQueries.map((query) =>
        client.fetch(query).then((res) => {
          modulesArray.push(res[0]);
        })
      )
    ).then(() => {
      modulesArray.sort((a, b) => a.order - b.order);
      setModules(modulesArray);
      setLoading(false);
    });
    setLoading(false);
  };

  const fetchWeeks = async () => {
    setLoading(true);
    const weeksQuery = `*[_type == "week"] {name, order}`;
    const fetch = await client.fetch(weeksQuery);
    const response = await fetch;
    setAllWeeks(response.sort((a, b) => a.order - b.order));
    setLoading(false);
  };

  const fetchAll = async () => {
    await fetchModuleRefs();
    await fetchModules();
    await fetchWeeks();
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
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        width: "100%",
        minHeight: "100vh",
        height: "100%",
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
          <DescriptionContainer>
            <StyledTypo>{description}</StyledTypo>
          </DescriptionContainer>
          <Container maxWidth="xl">
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
          </Container>
        </>
      )}
    </Box>
  );
};

export default WeekPage;

const DescriptionContainer = styled.div`
  background-color: #e93a7d;
  color: white;
  padding: 48px;
  white-space: pre-line;
  vertical-align: bottom;

  @media (min-width: 1100px) {
    padding-left: 30vh;
    padding-right: 30vh;
  }
`;

const CardContainer = styled.div`
  display: grid;
  gap: 2vh;
  padding: 2vh 0;
  margin: 0 auto;

  @media (min-width: 768px) {
    gap: 3vh;
    padding: 3vh 0;
  }
`;

const StyledTypo = styled(Typography)`
  && {
    font-size: 18px;
    line-height: 30px;
  }
`;
