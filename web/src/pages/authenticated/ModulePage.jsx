import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import LessonList from "../../components/authenticated/LessonList";
import { PageContainer } from "../../styledcomponents/globalstyles";
import { Stack, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ProgressCircle from "../../components/authenticated/ProgressCircle";
import LoadingIndicator from "../../components/LoadingIndicator";
import { authenticated } from "../../reducers/authenticated";
import styled from "styled-components";

const ModulePage = () => {
  // For setting the page and beginning the queries
  const dispatch = useDispatch();
  const { module } = useParams();
  const [moduleTitle, setModuleTitle] = useState("");
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
  ).filter((lesson) => lessonIds.includes(lesson._key));

  // For fetching module - Step 1
  const fetchModule = async () => {
    setLoading(true);
    console.log("fetchmodule and lesson queries begun");
    const moduleQuery = `*[_type == "module" && title == "${module}"]`;
    const fetch = await client.fetch(moduleQuery);
    const response = await fetch;
    setModuleTitle(response[0].name);
    setModuleType(response[0].type);
    setModuleDescription(response[0].description);
    lessonQueries = response[0].lesson.map(
      (lesson) => `*[_type == "lesson" && _id == "${lesson._ref}"]`
    );
    setLoading(false);
  };

  // For fetching lessons - waits for module fetch
  const fetchLessons = async () => {
    setLoading(true);
    console.log("fetch lessons and set lessons begun");
    await Promise.all(
      lessonQueries.map((query) =>
        client.fetch(query).then((res) => {
          lessonsArray.push(res[0]);
        })
      )
    ).then(() => {
      lessonsArray.sort((a, b) => a.order - b.order);
      setLessons(lessonsArray);
      setLoading(false);
    });
  };

  // For fetching completed lessons by user
  const fetchCompletedLessons = async () => {
    const completedLessonQuery = `*[_type == "user" && _id == "${userid}"] {completed}`;
    setLoading(true);
    console.log("fetch completed lessons by user begun");
    const fetch = await client.fetch(completedLessonQuery);
    const response = await fetch;
    console.log("completed lessons response", response);

    if (response[0].completed === null || response[0].completed.length === 0) {
      console.log("completed lessons response registered as null or zero");
      // For progress tracker
    } else {
      console.log("completed lessons response registered as existing");
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
    await fetchLessons();
    await fetchCompletedLessons();
  };

  // UseEffect for fetchAll
  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <HeaderAuth />
      {loading && <LoadingIndicator />}
      {!loading && (
        <>
          <PageContainer>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb="3vh"
            >
              <div>
                <Typography fontSize={28} fontWeight={500}>
                  {moduleType}
                </Typography>
                <Typography variant="body2">{moduleTitle}</Typography>
              </div>
              <ProgressCircle value={progress} />
            </Stack>
          </PageContainer>
          {moduleDescription && (
            <DescriptionContainer>
              <Typography>{moduleDescription}</Typography>
            </DescriptionContainer>
          )}

          <LessonList key={lessons} lessons={lessons} />
        </>
      )}
    </Box>
  );
};

export default ModulePage;

const DescriptionContainer = styled.div`
  background-color: #e93a7d;
  color: white;
  padding: 48px;
  margin-bottom: 2vh;
  white-space: pre-line;
  vertical-align: bottom;
`;
