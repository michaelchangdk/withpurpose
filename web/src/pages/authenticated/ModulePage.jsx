import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import LessonList from "../../components/authenticated/LessonList";
import { PageContainer } from "../../styledcomponents/globalstyles";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ProgressCircle from "../../components/authenticated/ProgressCircle";
import LoadingIndicator from "../../components/LoadingIndicator";

const ModulePage = () => {
  // For setting the page and beginning the queries
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

  // For Progress Circle
  const [numberOfCompletedLessons, setNumberOfCompletedLessons] = useState(0);
  const [totalNumberOfLessons, setTotalNumberOfLessons] = useState(0);

  // For tracking completed lessons
  const lessonIds = lessons.map((a) => a._id);
  let completedArray = [];
  const [completedLessons, setCompletedLessons] = useState([]);

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
    setTotalNumberOfLessons(response[0].lesson.length);
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

    if (response[0].completed === null) {
      setNumberOfCompletedLessons(0);
    } else {
      completedArray = response[0].completed.filter((lesson) =>
        lessonIds.includes(lesson.lessonRef)
      );
      setCompletedLessons(completedArray);
      setNumberOfCompletedLessons(completedArray.length);
    }
    setLoading(false);
  };

  // For Setting Progress
  const progressTracker = async () => {
    const progress = (numberOfCompletedLessons / totalNumberOfLessons) * 100;
    if (progress >= 0) {
      setProgress(progress);
    } else {
      setProgress(0);
    }
  };

  // Async function for fetching everything in order
  const fetchAll = async () => {
    await fetchModule();
    await fetchLessons();
    await fetchCompletedLessons();
    await progressTracker();
  };

  // let completedLessonRefs = completedLessons
  //   ? completedLessons.map((a) => a.lessonRef)
  //   : [];

  // console.log(completedLessons);

  // For listening to changes in completed lessons
  useEffect(() => {
    const listenForLessonChange = () => {
      const completedLessonQuery = `*[_type == "user" && _id == "${userid}"] {completed}`;
      client.listen(completedLessonQuery).subscribe((update) => {
        console.log(update);
        completedArray = update.result.completed.filter((lesson) =>
          lessonIds.includes(lesson.lessonRef)
        );
        setCompletedLessons(completedArray);
      });
    };

    listenForLessonChange();

    progressTracker();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  // UseEffect for fetchAll
  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(completedLessons);

  return (
    <>
      <HeaderAuth />
      {loading && <LoadingIndicator />}
      {!loading && (
        <>
          <PageContainer>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>{moduleType}</Typography>
              <ProgressCircle value={progress} />
            </Stack>
            <Typography variant="body2">{moduleTitle}</Typography>
            {/* FIGURE OUT HOW TO ADD NEW LINES TO DESCRIPTION FOR NON-VIDEO! */}
            <div>{moduleDescription}</div>
          </PageContainer>

          <LessonList
            key={lessons}
            lessons={lessons}
            completedLessons={completedLessons}
            // completedLessonRefs={completedLessonRefs}
          />
        </>
      )}
    </>
  );
};

export default ModulePage;
