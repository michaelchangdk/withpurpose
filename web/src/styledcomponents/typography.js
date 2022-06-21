import styled from "styled-components/macro";
import { Typography } from "@mui/material";

// Blog
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

export const BlogTitle = styled(Typography)`
  && {
    font-size: 28px;
  }

  @media (min-width: 768px) {
    && {
      font-size: 40px;
    }
  }
`;

export const BlogAuthor = styled(Typography)`
  && {
    font-size: 16px;
  }

  @media (min-width: 768px) {
    && {
      font-size: 20px;
    }
  }
`;

export const PageHeader = styled(Typography)`
  && {
    font-size: 32px;
    text-transform: uppercase;
    line-height: 0.9;
  }

  @media (min-width: 768px) {
    && {
      font-size: 48px;
      margin: 0 auto;
    }
  }
`;

// Public Pages
export const PageTitle = styled(Typography)`
  && {
    font-size: 40px;
    margin-bottom: 24px;
    text-align: center;
  }
  @media (min-width: 768px) {
    && {
      font-size: 60px;
      padding: 0 60px;
      margin: 0 auto 32px auto;
    }
  }
`;

export const PageSubtitle = styled(Typography)`
  && {
    font-size: 28px;
    margin-bottom: 40px;
    padding: 0 60px;
    text-align: center;
  }

  @media (min-width: 768px) {
    && {
      font-size: 36px;
      padding: 0 60px;
      margin: 0 auto 60px auto;
    }
  }
`;
