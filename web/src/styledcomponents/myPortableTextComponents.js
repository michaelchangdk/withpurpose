import { ImgW100 } from "./images";
import { PageHeader } from "./typography";
import { urlFor } from "../client";
import { Typography, Link } from "@mui/material";
import styled from "styled-components/macro";

const myPortableTextComponents = {
  types: {
    image: ({ value }) => (
      <ImgW100 src={urlFor(value.asset._ref).url()} alt={value.asset._ref} />
    ),
    callToAction: ({ value, isInline }) =>
      isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className="callToAction">{value.text}</div>
      ),
  },
  block: {
    blockquote: ({ children }) => (
      <blockquote style={{ fontSize: "18px" }}>{children}</blockquote>
    ),
    h1: ({ children }) => <PageHeader>{children}</PageHeader>,
    centerblock: ({ children }) => {
      return (
        <StyledCenterBlock>
          <StyledCenterBlockText>{children}</StyledCenterBlockText>
        </StyledCenterBlock>
      );
    },
    normal: ({ children }) => <Typography>{children}</Typography>,
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          sx={{ textDecoration: "underline", color: "text.primary" }}
        >
          {children}
        </Link>
      );
    },
    purpletext: ({ children }) => {
      return (
        <span style={{ color: "#6356d7", fontWeight: 500 }}>{children}</span>
      );
    },
    pinktext: ({ children }) => {
      return (
        <span style={{ color: "#e93a7d", fontWeight: 500 }}>{children}</span>
      );
    },
    bluetext: ({ children }) => {
      return (
        <span style={{ color: "#5491e3", fontWeight: 500 }}>{children}</span>
      );
    },
  },
};

export default myPortableTextComponents;

const StyledCenterBlockText = styled(Typography)`
  && {
    width: 80%;
    left: 100px;
    font-size: 24px;
    line-height: 1.1;
  }
`;

const StyledCenterBlock = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 32px auto;
`;
