import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import LessonList from "../../components/authenticated/LessonList";
import { PageContainer } from "../../styledcomponents/globalstyles";
import { Stack, Typography, CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";

const CircularProgressWithLabel = (props) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const ModulePage = () => {
  const { module } = useParams();
  const [moduleDescription, setModuleDescription] = useState("");
  const [lessonQueries, setLessonQueries] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [moduleType, setModuleType] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [completedLessons, setCompletedLessons] = useState([]);
  const userid = useSelector((store) => store.authenticated.uid);
  let lessonsArray = [];
  let completedLessonRefs = completedLessons
    ? completedLessons.map((a) => a.lessonRef)
    : [];
  const lessonIds = lessons.map((a) => a._id);

  // For fetching module - Step 1
  const moduleQuery = `*[_type == "module" && title == "${module}"]`;
  const fetchLessonRefs = async () => {
    const fetch = await client.fetch(moduleQuery);
    const response = await fetch;
    setModuleTitle(response[0].name);
    setModuleType(response[0].type);
    if (response[0].description) {
      setModuleDescription(response[0].description);
    }
    setLessonQueries(
      response[0].lesson.map(
        (lesson) => `*[_type == "lesson" && _id == "${lesson._ref}"]`
      )
    );
  };

  // For fetching lessons - waits for module fetch
  const fetchLessons = async () => {
    await Promise.all(
      lessonQueries.map((query) =>
        client.fetch(query).then((res) => {
          lessonsArray.push(res[0]);
        })
      )
    ).then(() => {
      lessonsArray.sort((a, b) => a.order - b.order);
      console.log(lessonsArray);
      setLessons(lessonsArray);
      setLoading(false);
    });
  };

  // For fetching completed lessons at first
  const completedLessonQuery = `*[_type == "user" && _id == "${userid}"] {completed}`;
  const fetchCompletedLessons = async () => {
    const fetch = await client.fetch(completedLessonQuery);
    const response = await fetch;
    console.log("completed lessons response", response);
    setCompletedLessons(
      response[0].completed.filter((lesson) =>
        lessonIds.includes(lesson.lessonRef)
      )
    );
  };

  console.log(completedLessons);

  // For fetching everything at first
  const fetchAll = async () => {
    await fetchLessonRefs();
    await fetchLessons();
    fetchCompletedLessons();
  };

  // UseEffect for fetching all
  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // For listening to changes in completed lessons
  const listenForLessonChange = () => {
    setLoading(true);
    client.listen(completedLessonQuery).subscribe((update) => {
      console.log(
        update.result.completed.filter((lesson) =>
          lessonIds.includes(lesson.lessonRef)
        )
      );
      setCompletedLessons(
        update.result.completed.filter((lesson) =>
          lessonIds.includes(lesson.lessonRef)
        )
      );
      setLoading(false);
    });
  };

  useEffect(() => {
    listenForLessonChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progressTracker = () => {
    completedLessons.length > 0
      ? setProgress((completedLessons.length / lessons.length) * 100)
      : setProgress(0);
  };

  useEffect(() => {
    progressTracker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      <HeaderAuth />
      <PageContainer>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>{moduleType}</Typography>
          <CircularProgressWithLabel
            value={progress}
            key={listenForLessonChange}
          />
        </Stack>
        <Typography variant="body2">{moduleTitle}</Typography>
        {/* FIGURE OUT HOW TO ADD NEW LINES TO DESCRIPTION FOR NON-VIDEO! */}
        {moduleDescription.length > 0 && <div>{moduleDescription}</div>}
      </PageContainer>
      <LessonList
        key={listenForLessonChange}
        lessons={lessons}
        completedLessons={completedLessons}
        completedLessonRefs={completedLessonRefs}
      />
    </>
  );
};

export default ModulePage;
