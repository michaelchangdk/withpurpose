import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// MUI Imports
import { Card, Stack, Typography, Button } from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
// Component Imports
import ProgressCircle from "./ProgressCircle";

const ModuleCards = ({ duration, name, title, type, module }) => {
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState("primary");
  const [buttonText, setButtonText] = useState("Start");
  const navigate = useNavigate();

  const lessonRefs = module.lesson.map((a) => a._ref);
  const completedLessonsLength = useSelector(
    (store) => store.authenticated.completedLessons
  ).filter((lesson) => lessonRefs.includes(lesson.lessonRef)).length;

  // useEffect for progress tracker
  useEffect(() => {
    const progress = (completedLessonsLength / module.lesson.length) * 100;
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
  }, [module.lesson.length, completedLessonsLength]);

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
      }}
    >
      <Stack gap={1}>
        {/* <Stack sx={{ height: "100%" }} height="100%"> */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" fontWeight={400} fontSize="16px">
            {type}
          </Typography>
          <ProgressCircle
            value={progress}
            circleSize={30}
            iconSize={30}
            fontSize={10}
          />
        </Stack>
        <Typography variant="body1" fontWeight={500} fontSize="18px">
          {name}
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          {(type === "Course videos" || type === "Live session") && (
            <OndemandVideoIcon fontSize="large" />
          )}
          {type === "Exercises" && <ModeOutlinedIcon fontSize="large" />}
          {type === "Optional resources" && (
            <PlaylistAddOutlinedIcon fontSize="large" />
          )}
          <Typography
            variant="subtitle"
            color="text.secondary"
            fontWeight={400}
            fontSize={14}
          >
            {type} | {duration}
          </Typography>
        </Stack>
        {/* <Typography variant="body2" fontWeight={300} fontSize={12} mt={1}>
        {duration}
      </Typography> */}
        {/* ADD PROPS FOR STYLING BUTTON & TEXT - START, CONTINUE, ALL DONE, COMING SOON for DISABLED */}
        <Stack direction="column" alignItems="flex-start" mt={1}>
          <Button
            variant="contained"
            disableElevation
            onClick={() => navigate(`/module/${title}`)}
            size="small"
            color={color}
            sx={{ width: 90 }}
            // endIcon={<StartRoundedIcon />}
          >
            {buttonText}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ModuleCards;
