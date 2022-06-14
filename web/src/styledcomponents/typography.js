import styled from "styled-components/macro";
import { Typography } from "@mui/material";

export const Duration = styled(Typography)`
  && {
    padding: 0 4px;
    font-size: 1rem;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const H1 = styled(Typography)`
    && {
    font-size: 4rem;
    font-weight: 900;
    font-style: italic;
    text-align: center;
    text-transform: uppercase;
    line-height: .9;
    margin-bottom: 32px;
    }
`;

export const PageHeader = styled(Typography)`
  && {
    font-size: 32px;
    text-transform: uppercase;
    line-height: .9;
  }

  @media (min-width: 768px) {
    && {
      font-size: 48px;
      margin: 0 auto;
    }
  }
`;