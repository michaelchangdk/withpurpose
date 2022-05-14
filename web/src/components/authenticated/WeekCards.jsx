import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Stack,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

const CircularProgressWithLabel = (props) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

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
  return (
    <Card sx={{ maxWidth: 345, minHeight: 150, padding: 1 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="caption">
          {title} | {keyword}
        </Typography>
        <CircularProgressWithLabel value={progress} />
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
