import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography, Stack } from "@mui/material";
import styled from "styled-components";

const LoadingIndicator = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default LoadingIndicator;

const Wrapper = styled.div`
  margin: 3vh auto 0 auto;
`;
