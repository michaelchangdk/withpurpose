import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Stack, Typography, Button } from "@mui/material";
import ProgressCircle from "./ProgressCircle";
import { useSelector } from "react-redux";
import NoAccessModal from "./NoAccessModal";
// import StartRoundedIcon from "@mui/icons-material/StartRounded";

const WeekCards = ({
  title,
  keyword,
  shortDescription,
  liveSessionTitle,
  liveSessionDate,
  name,
}) => {
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const access = Object.entries(
    useSelector((store) => store.authenticated.access)
  ).filter(([key, val]) => key.includes(name) && val === true);

  const progressTracker = () => {
    setProgress(0);
  };

  useEffect(() => {
    progressTracker();
  }, []);

  const navigateToWeek = () => {
    if (access.length === 1) {
      navigate(`/week/${name}`);
    } else {
      setOpenModal(true);
    }
  };

  if (access.length !== 1) {
    setDisabled(true);
  }

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
      <Stack
        direction="column"
        alignItems="flex-end"
        position="absolute"
        bottom="0"
        right="0"
        margin={1}
      >
        <Button
          variant="contained"
          disableElevation
          disabled={disabled}
          onClick={navigateToWeek}
          size="small"
          // endIcon={<StartRoundedIcon />}
        >
          Start
        </Button>
      </Stack>
      <NoAccessModal openModal={openModal} setOpenModal={setOpenModal} />
    </Card>
  );
};

export default WeekCards;
