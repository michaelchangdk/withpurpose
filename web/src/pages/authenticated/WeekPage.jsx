import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import { urlFor } from "../../client";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import ModuleCards from "../../components/authenticated/ModuleCards";
import { PageContainer } from "../../styledcomponents/globalstyles";
import styled from "styled-components";
import down from "../../assets/down.png";
import { Stack, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const WeekPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [moduleQueries, setModuleQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroRef, setHeroRef] = useState("");
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
    setTitle(response[0].title);
    setSubtitle(response[0].subtitle);
    setDescription(response[0].description);
    setHeroRef(response[0].heroImage.asset._ref);
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
          <Header backgroundimage={urlFor(heroRef).url()}>
            <HeaderAuth />
            <PageContainer>
              <HeaderTitleWrapper>
                <HeaderTitle>{subtitle}</HeaderTitle>
                <HeaderSubtitle>{title}</HeaderSubtitle>
              </HeaderTitleWrapper>
              <HeaderInstruction>
                <HeaderSubtitle>Scroll to the course</HeaderSubtitle>
                <HeaderIcon src={down} alt="down arrow." />
              </HeaderInstruction>
            </PageContainer>
          </Header>
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

const Header = styled.header`
  width: 100vw;
  height: 100vh;
  background-image: url(${(props) => props.backgroundimage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
`;

const HeaderTitle = styled.h1`
  color: white;
  font-size: 64px;
  padding-bottom: 10px;
`;

const HeaderSubtitle = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: 300;
`;

const HeaderTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20vh;
`;

const HeaderInstruction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin-bottom: 2vh;
  gap: 1vh;
`;

const HeaderIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const DescriptionContainer = styled.div`
  background-color: #e93a7d;
  color: white;
  padding: 48px;
  margin-bottom: 2vh;
  white-space: pre-line;
  vertical-align: bottom;
`;
