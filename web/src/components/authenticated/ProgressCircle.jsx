import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { theme } from "../../styledcomponents/theme";
import { ThemeProvider } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ProgressCircle = (props) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <ThemeProvider theme={theme}>
        <CircularProgress
          variant="determinate"
          color="green"
          {...props}
          size={40}
          // Setting thickness was creating lag along with themeprovider
          // thickness={4}
        />
      </ThemeProvider>
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
        {props.value < 100 && (
          <Typography component="div" color="text.secondary" fontSize={12}>
            {`${Math.round(props.value)}%`}
          </Typography>
        )}
        {props.value === 100 && (
          <ThemeProvider theme={theme}>
            <CheckCircleIcon color="green" sx={{ fontSize: 42 }} />
          </ThemeProvider>
        )}
      </Box>
    </Box>
  );
};

export default ProgressCircle;

// LARGE SIZE:
// Circular: 40,
// Icon: 42,
// Text: 12,

// SMALL SIZE:
// Circular: 30
// Icon: 32,
// Text: 12
