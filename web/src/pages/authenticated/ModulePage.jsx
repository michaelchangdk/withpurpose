import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import LessonList from "../../components/authenticated/LessonList";
import { Stack, Typography, Button, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ProgressCircle from "../../components/authenticated/ProgressCircle";
import LoadingIndicator from "../../components/LoadingIndicator";
import { authenticated } from "../../reducers/authenticated";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import { BackgroundBox } from "../../styledcomponents/globalstyles";

const ModulePage = () => {
  // For setting the page and beginning the queries
  const dispatch = useDispatch();
  const { module } = useParams();
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [moduleType, setModuleType] = useState("");
  let lessonQueries = [];

  // For loading and progress states
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // For setting lessons
  let lessonsArray = [];
  const [lessons, setLessons] = useState([]);

  const userid = useSelector((store) => store.authenticated.uid);

  // For tracking completed lessons
  const lessonIds = lessons.map((a) => a._id);
  const completedLessons = useSelector(
    (store) => store.authenticated.completedLessons
  ).filter((lesson) => lessonIds.includes(lesson.lessonRef));

  // For Navigation
  const navigate = useNavigate();
  const [moduleArray, setModuleArray] = useState([]);
  const [moduleIndex, setModuleIndex] = useState();
  const [week, setWeek] = useState("");

  // For fetching module - Step 1
  const fetchModule = async () => {
    setLoading(true);
    const moduleQuery = `*[_type == "module" && title == "${module}"]`;
    const fetch = await client.fetch(moduleQuery);
    const response = await fetch;
    setModuleName(response[0].name);
    setModuleType(response[0].type);
    setModuleDescription(response[0].description);
    lessonQueries = response[0].lesson.map(
      (lesson) =>
        `*[_type == "lesson" && _id == "${lesson._ref}"] {name, duration, isLink, isVideo, isPDF, order, otherUrl, taskDescription, title, file, videoUrl, "pdfUrl": file.asset->url, _id}`
    );
    setLoading(false);
  };

  // For Navigation
  const fetchWeek = async () => {
    setLoading(true);
    const weekQuery = `*[_type == "module" && title == "${module}"] {"week": *[_type=='week' && references(^._id)]{name, title}}`;
    const fetch = await client.fetch(weekQuery);
    const response = await fetch;
    setWeek(response[0].week[0].name);
  };

  const fetchModules = async () => {
    setLoading(true);
    const allModulesQuery = `*[_type == "module"]`;
    const fetch = await client.fetch(allModulesQuery);
    const response = await fetch;
    const filteredSortedModules = response
      .map((modules) => modules.title)
      .filter((modules) => modules.includes(module.split("M")[0]))
      .sort((a, b) => a[3] - b[3]);
    // console.log(
    //   response
    //     .map((module) => module.title)
    //     .filter((module) => module.includes(moduleTitle.split("M")[0]))
    //     .sort((a, b) => a[3] - b[3])
    // );
    setModuleArray(filteredSortedModules);
    setLoading(false);
  };

  useEffect(() => {
    setModuleIndex(moduleArray.indexOf(module));
  }, [moduleArray, module, moduleIndex]);

  // For fetching lessons - waits for module fetch
  const fetchLessons = async () => {
    setLoading(true);
    await Promise.all(
      lessonQueries.map((query) =>
        client.fetch(query).then((res) => {
          lessonsArray.push(res[0]);
        })
      )
    ).then(() => {
      lessonsArray.sort((a, b) => a.order - b.order);
      setLessons(lessonsArray);
    });
    setLoading(false);
  };

  // For fetching completed lessons by user
  const fetchCompletedLessons = async () => {
    setLoading(true);
    const completedLessonQuery = `*[_type == "user" && _id == "${userid}"] {completed}`;
    const fetch = await client.fetch(completedLessonQuery);
    const response = await fetch;

    if (response[0].completed === null || response[0].completed.length === 0) {
      // For progress tracker
    } else {
      response[0].completed.forEach((lesson) =>
        dispatch(authenticated.actions.addCompletedLesson(lesson))
      );
    }
    setLoading(false);
  };

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
    await fetchWeek();
    await fetchLessons();
    await fetchCompletedLessons();
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
      <CardContainer>
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
                />
              </Stack>
            </Container>
            {moduleDescription && (
              <DescriptionContainer>
                <StyledTypo>{moduleDescription}</StyledTypo>
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
      </CardContainer>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default ModulePage;

const DescriptionContainer = styled.div`
  background-color: #e93a7d;
  /* background-color: #6356d7; */
  /* background-color: #5491e3; */
  color: white;
  padding: 48px;
  white-space: pre-line;
  vertical-align: bottom;

  @media (min-width: 768px) {
    padding: 48px 30%;
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
  /* && {
} */

  @media (min-width: 768px) {
    && {
      font-size: 18px;
      line-height: 30px;
    }
  }
`;
