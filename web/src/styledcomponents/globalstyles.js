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

const Grid = styled.div`
  display: grid;
`;

export const Grid1Col = styled(Grid)`
  gap: 32px;
`;

export const ThreeGrid = styled(Grid)`
  &&{
    gap: 32px;
    margin: 0 auto;

    @media (min-width: 768px) {
      max-width: calc(1200px + 6vh);
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export const ThreeGridCentered = styled(ThreeGrid)`
  &&{
    justify-items: center;
  }
`

const Flexbox = styled.div`
  display: flex;
`;

export const FlexSpaceBetween = styled(Flexbox)`
  &&{
    justify-content: space-between;
  }
`;