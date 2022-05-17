import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Stack,
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

const ModuleCards = ({ duration, name, title, type }) => {
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
        <Typography variant="caption">{type}</Typography>
        <CircularProgressWithLabel value={progress} />
      </Stack>
      <Typography variant="body1" fontWeight={500}>
        {name}
      </Typography>
      <Typography variant="body2" fontWeight={300} fontSize={14}>
        Icon - {type}
      </Typography>
      <Typography variant="body2" fontWeight={300} fontSize={12}>
        {duration}
      </Typography>
      {/* ADD PROPS FOR STYLING BUTTON & TEXT - START, CONTINUE, ALL DONE, COMING SOON for DISABLED */}
      <Button onClick={() => navigate(`/module/${title}`)}>Start</Button>
    </Card>
  );
};

export default ModuleCards;
