import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography, Box, Stack } from "@mui/material";

const LoadingIndicator = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ margin: "0 auto" }}
        gap={2}
      >
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Loading...
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoadingIndicator;
