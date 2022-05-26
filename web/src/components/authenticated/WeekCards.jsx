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
  const [color, setColor] = useState("primary");
  const [buttonText, setButtonText] = useState("Start");
  const [lessonRefArray, setLessonRefArray] = useState([]);
  const access = Object.entries(
    useSelector((store) => store.authenticated.access)
  ).filter(([key, val]) => key.includes(name) && val === true);
  const moduleQueries = module.map(
    (module) => `*[_type == "module" && _id == "${module._ref}"] {lesson}`
  );
  const completedLessons = useSelector(
    (store) => store.authenticated.completedLessons
  )
    .map((lesson) => lesson.lessonRef)
    .filter((lesson) => lessonRefArray.includes(lesson));

  // THIS IS FOR THE PROGRESS BARS - BUGGY //
  const fetchLessonRefs = async () => {
    // eslint-disable-next-line array-callback-return
    moduleQueries.map((query) => {
      client.fetch(query).then((response) => {
        const lessonRefs = response[0].lesson.map((lesson) => lesson._ref);
        lessonRefs.forEach((ref) =>
          setLessonRefArray((prev) => [...prev, ref])
        );
      });
    });
  };

  useEffect(() => {
    fetchLessonRefs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const progress = (completedLessons.length / lessonRefArray.length) * 100;
    if (progress === 0) {
      setProgress(progress);
      setColor("primary");
      setButtonText("Start");
    } else if (0 < progress && progress < 100) {
      setProgress(progress);
      setColor("secondary");
      setButtonText("Continue");
    } else if (progress === 100) {
      setProgress(progress);
      setColor("success");
      setButtonText("All done!");
    } else {
      setProgress(0);
    }
  }, [completedLessons.length, lessonRefArray.length]);
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
            color={color}
            sx={{ width: 120 }}
            // endIcon={<StartRoundedIcon />}
          >
            {disabled ? "Coming soon" : buttonText}
          </Button>
        </Stack>
      </Stack>
      <NoAccessModal openModal={openModal} setOpenModal={setOpenModal} />
    </Card>
  );
};

export default WeekCards;
