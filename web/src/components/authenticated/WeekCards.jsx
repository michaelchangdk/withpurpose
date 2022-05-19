import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Stack, Typography, Button } from "@mui/material";
import ProgressCircle from "./ProgressCircle";

const WeekCards = ({
  title,
  keyword,
  shortDescription,
  liveSessionTitle,
  liveSessionDate,
  name,
}) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const progressTracker = () => {
    setProgress(0);
  };

  useEffect(() => {
    progressTracker();
  }, []);

  return (
    <Card
      sx={{
        // maxWidth: 345,
        minHeight: 150,
        padding: 1,
        mx: "auto",
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
      <Button onClick={() => navigate(`/week/${name}`)}>Start</Button>
    </Card>
  );
};

export default WeekCards;
