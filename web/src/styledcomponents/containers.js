import styled from "styled-components/macro";
import { Box } from "@mui/material";

// All Pages
export const BackgroundBox = styled(Box)`
  && {
    width: 100%;
    min-height: 100vh;
    height: 100%;
  }
`;

// Public Pages
// 1, 2, 3 columns container
export const CardContainer = styled.div`
  display: grid;
  gap: 32px;
  margin: 0 auto;
  justify-content: center;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    max-width: 782px;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 60px;
  }

  @media (min-width: 1100px) {
    max-width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
