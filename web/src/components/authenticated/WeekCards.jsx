import React, { useState, useEffect } from "react";
// import { client } from "../../client";
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
  modulelessons,
}) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [color, setColor] = useState("primary");
  const [buttonText, setButtonText] = useState("Start");
  const access = Object.entries(
    useSelector((store) => store.authenticated.access)
  ).filter(([key, val]) => key.includes(name) && val === true);

  // FOR PROGRESS BAR
  const lessonArray = modulelessons.map((nested) =>
    nested.lesson.map((lesson) => lesson._ref)
  );
  const lessonRefArray = [].concat.apply([], lessonArray);

  const completedLessons = useSelector(
    (store) => store.authenticated.completedLessons
  )
    .map((lesson) => lesson.lessonRef)
    .filter((lesson) => lessonRefArray.includes(lesson));

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

  // NAVIGATION AND ACCESS PERMISSIONS //
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

  return (
    <Card
      sx={{
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
        <Stack direction="column" alignItems="flex-start">
          <Button
            variant="contained"
            disableElevation
            disabled={disabled}
            onClick={navigateToWeek}
            size="small"
            color={color}
            sx={{ width: 120 }}
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
