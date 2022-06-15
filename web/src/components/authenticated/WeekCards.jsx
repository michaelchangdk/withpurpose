import React, { useState, useEffect } from "react";
import { client } from "../../client";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// MUI Imports
import { Card, Stack, Typography, Button } from "@mui/material";
// Component Imports
import ProgressCircle from "./ProgressCircle";
import NoAccessModal from "./NoAccessModal";

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

  // THIS IS FOR THE PROGRESS BARS //
  const fetchLessonRefs = async () => {
    moduleQueries.map((query) => {
      client.fetch(query).then((response) => {
        const lessonRefs = response[0].lesson.map((lesson) => lesson._ref);
        lessonRefs.forEach((ref) =>
          setLessonRefArray((prev) => [...prev, ref])
        );
      });
      return null;
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
  // PROGRESS BAR SECTION OVER //

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
        // height: 175,
        padding: 2,
        mx: "auto",
        width: "100%",
        maxWidth: "sm",
        minHeight: "186px",
      }}
    >
      {/* Is height necessary below? */}
      <Stack sx={{ height: "100%", justifyContent: "space-between" }} gap={1}>
        <div>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography
              variant="h4"
              fontWeight={400}
              fontSize="16px"
              sx={{ justifySelf: "flex-start" }}
            >
              {title} | {keyword}
            </Typography>
            <ProgressCircle
              value={progress}
              circleSize={30}
              iconSize={30}
              fontSize={10}
            />
          </Stack>
          <Typography variant="body1" fontWeight={500} fontSize="18px">
            {shortDescription}
          </Typography>
        </div>
        <div>
          <Typography
            variant="subtitle"
            color="text.secondary"
            fontWeight={400}
            fontSize={14}
          >
            {liveSessionTitle}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight={400}
            fontSize={14}
          >
            {liveSessionDate}
          </Typography>
        </div>
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
