import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import LessonList from "../../components/authenticated/LessonList";
import { PageContainer } from "../../styledcomponents/globalstyles";
import { Stack, Typography, CircularProgress, Box } from "@mui/material";

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
  let lessonsArray = [];

  const moduleQuery = `*[_type == "module" && name == "${module}"]`;

  const fetchLessonRefs = async () => {
    const fetch = await client.fetch(moduleQuery);
    const response = await fetch;
    setModuleTitle(response[0].title);
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

  const fetchLessons = async () => {
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

  const fetchAll = async () => {
    await fetchLessonRefs();
    await fetchLessons();
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const progressTracker = () => {
    setProgress(0);
  };

  useEffect(() => {
    progressTracker();
  }, []);

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
          <CircularProgressWithLabel value={progress} />
        </Stack>
        <Typography variant="body2">{moduleTitle}</Typography>
        {/* FIGURE OUT HOW TO ADD NEW LINES TO DESCRIPTION FOR NON-VIDEO! */}
        {moduleDescription.length > 0 && <div>{moduleDescription}</div>}
      </PageContainer>
      <LessonList lessons={lessons} />
    </>
  );
};

export default ModulePage;
