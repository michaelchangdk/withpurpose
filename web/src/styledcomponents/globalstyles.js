import { Box } from "@mui/material";
import styled from "styled-components/macro";

export const PageContainer = styled.div`
  /* width: calc(92vw - 16px); */
  /* width: 92vw; */
  width: calc(100vw - 32px);
  margin: 0 auto;
`;

export const BackgroundBox = styled(Box)`
  && {
    width: 100%;
    min-height: 100vh;
    height: 100%;
  }
`;
