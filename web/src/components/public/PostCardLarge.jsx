import React from "react";
import { useNavigate } from "react-router-dom";

// MUI imports
import {
  Typography,
  Link,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";

// Styling Imports
import styled from "styled-components/macro";
import {
  AspectRatioBox,
  AspectRatioChild,
} from "../../styledcomponents/containers";

const PostCardLarge = ({
  duration,
  title,
  url,
  id,
  excerpt,
  handleOpenModal,
  setOpenModal,
}) => {
  const navigate = useNavigate();

  const showBlogpost = (id) => {
    navigate(`/blog/${id}`);
  };
  return (
    <StyledCard>
      <Link
        sx={{ maxHeight: "300px", maxWidth: "100%" }}
        onClick={() => showBlogpost(id)}
      >
        <AspectRatioBox>
          <AspectRatioChild>
            <CardMedia
              component="img"
              width="100%"
              height="100%"
              alt={title}
              image={url}
            />
          </AspectRatioChild>
        </AspectRatioBox>
      </Link>
      <div style={{ maxWidth: "100%" }}>
        <StyledCardActions>
          <Duration>{duration}</Duration>
          <Button
            sx={{ color: "text.primary" }}
            size="small"
            onClick={() => handleOpenModal()}
          >
            Share
          </Button>
        </StyledCardActions>
        <Link
          onClick={() => showBlogpost(id)}
          sx={{ color: "text.primary", textDecoration: "none" }}
        >
          <CardContent>
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
        </Link>
      </div>
    </StyledCard>
  );
};

export default PostCardLarge;

const StyledCardActions = styled(CardActions)`
  && {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledCard = styled(Card)`
  && {
    max-width: 500px;
    display: grid;

    margin: 0 auto;

    flex-direction: column;
    flex-wrap: wrap;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;

      max-width: 100%;
      flex-wrap: no-wrap;
    }
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
