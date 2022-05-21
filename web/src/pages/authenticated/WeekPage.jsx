import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import ModuleCards from "../../components/authenticated/ModuleCards";
import { PageContainer } from "../../styledcomponents/globalstyles";
import styled from "styled-components";
import { Stack, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
// import { useSelector } from "react-redux";

const WeekPage = () => {
  const [description, setDescription] = useState("");
  const [moduleQueries, setModuleQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weekOrder, setWeekOrder] = useState();
  const { week } = useParams();
  let modulesArray = [];
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  // USE THESE TO DETERMINE ACCESS AND SET NAVIGATION BUTTON COLORS
  // ADD LOGIC FOR "NEXT WEEK / COMING SOON"
  // const [disabled, setDisabled] = useState();
  // const access = Object.entries(
  //   useSelector((store) => store.authenticated.access)
  // );
  // .filter(([key, val]) => key.includes(week) && val === true);

  // console.log(access, week, title);

  // useEffect(() => {
  //   if (access.length !== 1) {
  //     setDisabled(true);
  //   }
  // }, [access.length]);

  const weekQuery = `*[_type == "week" && name == "${week}"]`;

  const fetchModuleRefs = async () => {
    const fetch = await client.fetch(weekQuery);
    const response = await fetch;
    setDescription(response[0].description);
    setWeekOrder(response[0].order);
    setModuleQueries(
      response[0].module.map(
        (module) => `*[_type == "module" && _id == "${module._ref}"]`
      )
    );
  };

  const fetchModules = async () => {
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
  };

  const fetchAll = async () => {
    await fetchModuleRefs();
    await fetchModules();
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const previousWeek = () => {
    if (weekOrder === 4) {
      navigate(`/week/Week2`);
      window.location.reload();
    } else if (weekOrder === 3) {
      navigate(`/week/Week1`);
      window.location.reload();
    } else if (weekOrder === 2) {
      navigate(`/week/Week0`);
      window.location.reload();
    } else {
      navigate(`/week/Week${weekOrder - 1}`);
      window.location.reload();
    }
  };

  const nextWeek = () => {
    if (weekOrder === 2) {
      navigate(`/week/Week4`);
      window.location.reload();
    } else {
      navigate(`/week/Week${weekOrder + 1}`);
      window.location.reload();
    }
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
      {loading && <>Loading</>}
      {!loading && (
        <>
          <LandingPageHero
            query={`*[_type == "week" && name == "${week}"]`}
            type={"week"}
            displaySubtitle={true}
          />
          <DescriptionContainer>
            <p>{description}</p>
          </DescriptionContainer>
          <PageContainer>
            {loading && <p>Loading...</p>}
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
              mt="2vh"
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
                  // disabled={disabled}
                >
                  Next week
                </Button>
              )}
            </Stack>
          </PageContainer>
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
  margin-bottom: 2vh;
  white-space: pre-line;
  vertical-align: bottom;
`;
