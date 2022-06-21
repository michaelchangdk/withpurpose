import React from "react";

// MUI Imports
import { Typography, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
// Styling Imports
import styled from "styled-components/macro";

const LoadingIndicator = () => {
  return (
    <Wrapper>
      <Stack justifyContent="center" alignItems="center" gap={2}>
        <CircularProgress color="primary" />
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Loading...
        </Typography>
      </Stack>
    </Wrapper>
  );
};

export default LoadingIndicator;

const Wrapper = styled.div`
  padding: 24px 0;
  margin: 0 auto;
`;
