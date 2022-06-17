import React from "react";

// MUI Imports
import { CircularProgress, Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ProgressCircle = ({ value, circleSize, iconSize, fontSize }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        color="success"
        {...{ value: value }}
        size={circleSize}
        // Setting thickness was creating lag along with themeprovider
        thickness={6}
      />
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
        {value < 100 && (
          <Typography
            component="div"
            color="text.secondary"
            fontSize={fontSize}
          >
            {`${Math.round(value)}%`}
          </Typography>
        )}
        {value === 100 && (
          <CheckCircleIcon color="success" sx={{ fontSize: iconSize }} />
        )}
      </Box>
    </Box>
  );
};

export default ProgressCircle;

// NOTES:
// LARGE SIZE:
// Circular: 40,
// Icon: 42,
// Text: 12,

// SMALL SIZE:
// Circular: 30
// Icon: 32,
// Text: 12
