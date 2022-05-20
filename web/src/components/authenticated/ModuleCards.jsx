import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Stack, Typography, Button } from "@mui/material";
import ProgressCircle from "./ProgressCircle";
import { useSelector } from "react-redux";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styledcomponents/theme";

const ModuleCards = ({ duration, name, title, type, module }) => {
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState("green");
  const [buttonText, setButtonText] = useState("Start");
  const navigate = useNavigate();

  const lessonRefs = module.lesson.map((a) => a._ref);
  const completedLessonsLength = useSelector(
    (store) => store.authenticated.completedLessons
  ).filter((lesson) => lessonRefs.includes(lesson._key)).length;

  // useEffect for progress tracker
  useEffect(() => {
    const progress = (completedLessonsLength / module.lesson.length) * 100;
    if (progress === 0) {
      setProgress(progress);
      setColor("purple");
      setButtonText("Start");
    } else if (0 < progress && progress < 100) {
      setProgress(progress);
      setColor("pink");
      setButtonText("Continue");
    } else if (progress === 100) {
      setProgress(progress);
      setColor("green");
      setButtonText("All done!");
    } else {
      setProgress(0);
    }
  }, [module.lesson.length, completedLessonsLength]);

  console.log(progress);

  return (
    <Card
      sx={{
        // maxWidth: 345,
        minHeight: 150,
        padding: 1,
        mx: "auto",
        position: "relative",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="caption" fontSize={13}>
          {type}
        </Typography>
        <ProgressCircle value={progress} />
      </Stack>
      <Typography variant="body1" fontWeight={500} mb={1}>
        {name}
      </Typography>
      <Stack direction="row" alignItems="center" gap={1}>
        {(type === "Course videos" || type === "Live session") && (
          <OndemandVideoIcon />
        )}
        {type === "Exercises" && <ModeOutlinedIcon />}
        {type === "Optional resources" && <PlaylistAddOutlinedIcon />}
        <Typography variant="body2" fontWeight={300} fontSize={14}>
          {type}
        </Typography>
      </Stack>
      <Typography variant="body2" fontWeight={300} fontSize={12} mt={1}>
        {duration}
      </Typography>
      {/* ADD PROPS FOR STYLING BUTTON & TEXT - START, CONTINUE, ALL DONE, COMING SOON for DISABLED */}
      <Stack
        direction="column"
        alignItems="flex-end"
        position="absolute"
        bottom="0"
        right="0"
        margin={1}
      >
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </Stack>
    </Card>
  );
};

export default ModuleCards;
