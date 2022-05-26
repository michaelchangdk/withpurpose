import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Stack, Typography, Button } from "@mui/material";
import ProgressCircle from "./ProgressCircle";
import { useSelector } from "react-redux";
import NoAccessModal from "./NoAccessModal";
import { client } from "../../client";
// import StartRoundedIcon from "@mui/icons-material/StartRounded";

const WeekCards = ({
  name,
  title,
  keyword,
  shortDescription,
  liveSessionTitle,
  liveSessionDate,
  module,
}) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const access = Object.entries(
    useSelector((store) => store.authenticated.access)
  ).filter(([key, val]) => key.includes(name) && val === true);
  const moduleQueries = module.map(
    (module) => `*[_type == "module" && _id == "${module._ref}"] {lesson}`
  );
  const [lessonRefArray, setLessonRefArray] = useState([]);

  // THIS IS FOR THE PROGRESS BARS - BUGGY //
  let completed = useSelector(
    (store) => store.authenticated.completedLessons
  ).map((lesson) => lesson.lessonRef);
  let counter = 0;

  const fetchLessonRefs = () => {
    // eslint-disable-next-line array-callback-return
    moduleQueries.map((query) => {
      client.fetch(query).then((response) => {
        const lessonRefs = response[0].lesson.map((lesson) => lesson._ref);
        lessonRefs.forEach((ref) => console.log(ref));
        lessonRefs.forEach((ref) =>
          setLessonRefArray((prev) => [...prev, ref])
        );
      });
    });
  };

  // I THINK THE ISSUE IS THIS FUNCTION AND WHEN IT GETS CALLED
  const compareArrays = (array1, array2) => {
    array1.forEach((element) => {
      if (array2.includes(element)) {
        counter++;
      }
    });
  };

  useEffect(() => {
    fetchLessonRefs();
    compareArrays(completed, lessonRefArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const progressTracker = () => {
  //   setProgress((counter / lessonRefArray.length) * 100);
  // };

  useEffect(() => {
    // progressTracker();
    setProgress((counter / lessonRefArray.length) * 100);
  }, [counter, lessonRefArray.length]);
  // PROGRESS BAR SECTION OVER

  // NAVIGATION AND ACCESS //
  const navigateToWeek = () => {
    if (access.length === 1) {
      navigate(`/week/${name}`);
    } else {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (access.length !== 1) {
      setDisabled(true);
    }
  }, [access.length]);
  // NAVIGATION AND ACCESS //

  return (
    <Card
      sx={{
        // maxWidth: 345,
        // minHeight: 150,
        height: 175,
        padding: 2,
        mx: "auto",
      }}
    >
      {/* Is height necessary below? */}
      <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="caption">
            {title} | {keyword}
          </Typography>
          <ProgressCircle value={progress} />
        </Stack>
        <Typography variant="body1" fontWeight={500}>
          {shortDescription}
        </Typography>
        <Typography variant="body2" fontWeight={300} fontSize={14}>
          {liveSessionTitle}
        </Typography>
        <Typography variant="body2" fontWeight={300} fontSize={12}>
          {liveSessionDate}
        </Typography>
        {/* ADD PROPS FOR STYLING BUTTON & TEXT - START, CONTINUE, ALL DONE, COMING SOON for DISABLED */}
        <Stack direction="column" alignItems="flex-start">
          <Button
            variant="contained"
            disableElevation
            disabled={disabled}
            onClick={navigateToWeek}
            size="small"
            color="primary"
            sx={{ width: 120 }}
            // endIcon={<StartRoundedIcon />}
          >
            {disabled ? "Coming soon" : "Start"}
          </Button>
        </Stack>
      </Stack>
      <NoAccessModal openModal={openModal} setOpenModal={setOpenModal} />
    </Card>
  );
};

export default WeekCards;
