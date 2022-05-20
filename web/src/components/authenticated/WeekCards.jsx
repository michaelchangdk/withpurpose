import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Stack, Typography, Button } from "@mui/material";
import ProgressCircle from "./ProgressCircle";
import { useSelector } from "react-redux";
import NoAccessModal from "./NoAccessModal";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styledcomponents/theme";
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

  useEffect(() => {
    if (access.length !== 1) {
      setDisabled(true);
    }
  }, [access.length]);

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
      <Stack
        sx={{ height: "100%", justifyContent: "space-between" }}
        height="100%"
      >
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
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              disableElevation
              disabled={disabled}
              onClick={navigateToWeek}
              size="small"
              color={disabled ? "lightPurple" : "purple"}
              sx={{ width: 120 }}
              // endIcon={<StartRoundedIcon />}
            >
              {disabled ? "Coming soon" : "Start"}
            </Button>
          </ThemeProvider>
        </Stack>
      </Stack>
      <NoAccessModal openModal={openModal} setOpenModal={setOpenModal} />
    </Card>
  );
};

export default WeekCards;
