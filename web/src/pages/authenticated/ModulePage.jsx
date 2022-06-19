import React, { useState, useEffect } from "react";
import { client } from "../../client";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// MUI Imports
import { Stack, Typography, Button, Container } from "@mui/material";
// Component Imports
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import LessonList from "../../components/authenticated/LessonList";
import ProgressCircle from "../../components/authenticated/ProgressCircle";
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

const ModulePage = () => {
  // For setting the page and beginning the queries
  const { module } = useParams();
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [moduleType, setModuleType] = useState("");
  const [lessons, setLessons] = useState([]);

  // For loading and progress states
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // For tracking completed lessons
  const lessonIds = lessons.map((a) => a._id);
  const completedLessons = useSelector(
    (store) => store.authenticated.completedLessons
  ).filter((lesson) => lessonIds.includes(lesson.lessonReference));

  // For Navigation
  const navigate = useNavigate();
  const [moduleArray, setModuleArray] = useState([]);
  const [moduleIndex, setModuleIndex] = useState();
  const [week, setWeek] = useState("");

  // For fetching module - Step 1
  const fetchModule = async () => {
    setLoading(true);
    const moduleQuery = `*[_type == "module" && title == "${module}"] {duration, lesson[]->, name, title, type, _id, description, "week": *[_type=='week' && references(^._id)]{name, title}}`;
    const fetch = await client.fetch(moduleQuery);
    const response = await fetch;
    setModuleName(response[0].name);
    setModuleType(response[0].type);
    setModuleDescription(response[0].description);
    setLessons(response[0].lesson);
    setWeek(response[0].week[0].name);
    setLoading(false);
  };

  const fetchModules = async () => {
    setLoading(true);
    const allModulesQuery = `*[_type == "module"] {title}`;
    const fetch = await client.fetch(allModulesQuery);
    const response = await fetch;
    console.log(response);
    const filteredSortedModules = response
      .map((modules) => modules.title)
      .filter((modules) => modules.includes(module.split("M")[0]))
      .sort((a, b) => a[3] - b[3]);
    setModuleArray(filteredSortedModules);
    setLoading(false);
  };

  useEffect(() => {
    setModuleIndex(moduleArray.indexOf(module));
  }, [moduleArray, module, moduleIndex]);

  // useEffect for progress tracker
  useEffect(() => {
    const progress = (completedLessons.length / lessons.length) * 100;
    if (progress >= 0) {
      setProgress(progress);
    } else {
      setProgress(0);
    }
  }, [completedLessons.length, lessons.length]);

  // Async function for fetching everything in order
  const fetchAll = async () => {
    await fetchModule();
    await fetchModules();
  };

  // UseEffect for fetchAll
  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // For Navigation
  const navPreviousModule = () => {
    navigate(`/module/${moduleArray[moduleIndex - 1]}`);
    window.location.reload();
  };

  const navNextModule = () => {
    navigate(`/module/${moduleArray[moduleIndex + 1]}`);
    window.location.reload();
  };

  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <HeaderAuth />
      {loading && <LoadingIndicator />}
      <OneCardGrid>
        {!loading && (
          <>
            <Container maxWidth="lg">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb="1vh"
              >
                <div>
                  <Typography fontSize={28} fontWeight={500}>
                    {moduleType}
                  </Typography>
                  <Typography variant="body2">{moduleName}</Typography>
                </div>
                <ProgressCircle
                  value={progress}
                  circleSize={40}
                  iconSize={42}
                  fontSize={14}
                  key={lessons}
                />
              </Stack>
            </Container>
            {moduleDescription && (
              <DescriptionContainer backgroundcolor="#e93a7d">
                <DescriptionChild maxWidth="lg">
                  <DescriptionTypography>
                    {moduleDescription}
                  </DescriptionTypography>
                </DescriptionChild>
              </DescriptionContainer>
            )}

            <LessonList key={lessons} lessons={lessons} />
            <Container maxWidth="lg">
              <Stack
                direction="row"
                // justifyContent={moduleIndex === 0 ? "flex-end" : "space-between"}
                justifyContent="space-between"
              >
                {moduleIndex !== 0 && (
                  <Button
                    variant="contained"
                    sx={{ width: 140, height: 36 }}
                    size="small"
                    color="primary"
                    onClick={() => navPreviousModule()}
                    disableElevation
                  >
                    Last module
                  </Button>
                )}
                {/* SET PROPER WEEK - INCLUDE WEEK # */}
                {moduleIndex === 0 && (
                  <Button
                    variant="contained"
                    sx={{ width: 140, height: 36 }}
                    size="small"
                    color="info"
                    onClick={() => navigate(`/week/${week}`)}
                    disableElevation
                  >
                    Return to week
                  </Button>
                )}

                {moduleIndex !== moduleArray.length - 1 && (
                  <Button
                    variant="contained"
                    sx={{ width: 140, height: 36 }}
                    size="small"
                    color="primary"
                    onClick={() => navNextModule()}
                    disableElevation
                    // disabled={disabled}
                  >
                    Next module
                  </Button>
                )}
                {/* SET PROPER WEEK */}
                {moduleIndex === moduleArray.length - 1 && (
                  <Button
                    variant="contained"
                    sx={{ width: 140, height: 36 }}
                    size="small"
                    color="success"
                    onClick={() => navigate(`/week/${week}`)}
                    disableElevation
                    // disabled={disabled}
                  >
                    All done!
                  </Button>
                )}
              </Stack>
            </Container>
          </>
        )}
      </OneCardGrid>
      <PageFooter />
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default ModulePage;
