import styled from "styled-components/macro";
import { Typography } from "@mui/material";

export const Duration = styled(Typography)`
  && {
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