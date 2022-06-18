import React from "react";
import { urlFor } from "../../client";
import { useNavigate } from "react-router-dom";
// MUI Imports
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
} from "@mui/material";
// Styling Imports
import styled from "styled-components/macro";
import {
  AspectRatioBox,
  AspectRatioChild,
} from "../../styledcomponents/containers";

const PostCardSmall = ({ duration, title, url, id, excerpt, link }) => {
  const navigate = useNavigate();
  return (
    <CardActionArea onClick={() => navigate(link)}>
      <StyledCard>
        <CardMedia>
          <AspectRatioBox>
            <AspectRatioChild
              backgroundimage={urlFor(url).url()}
            ></AspectRatioChild>
          </AspectRatioBox>
        </CardMedia>
        <div style={{ maxWidth: "100%" }}>
          <CardContent sx={{ alignSelf: "start", height: "100%" }}>
            <StyledCardActions>
              <Duration>{duration}</Duration>
            </StyledCardActions>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ lineHeight: 1 }}
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {excerpt}...
            </Typography>
          </CardContent>
        </div>
      </StyledCard>
    </CardActionArea>
  );
};

const StyledCardActions = styled(CardActions)`
  && {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledCard = styled(Card)`
  && {
    cursor: pointer;
    margin: 0 auto;
    height: 100%;
  }
`;

const Duration = styled(Typography)`
  && {
    padding: 0 8px;
    font-size: 0.725rem;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

export default PostCardSmall;
