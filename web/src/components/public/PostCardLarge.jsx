import React from "react";
import { useNavigate } from "react-router-dom";

// MUI imports
import {
  Typography,
  Link,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
} from "@mui/material";

// Styling Imports
import styled from "styled-components/macro";
import {
  AspectRatioChild,
  AspectRatioBoxBlog,
} from "../../styledcomponents/containers";

const PostCardLarge = ({
  duration,
  title,
  url,
  id,
  excerpt,
  handleOpenModal,
}) => {
  const navigate = useNavigate();

  const showBlogpost = (id) => {
    navigate(`/blog/${id}`);
  };
  return (
    <StyledCard>
      <Link
        sx={{ maxWidth: "100%", cursor: "pointer" }}
        onClick={() => showBlogpost(id)}
      >
        <AspectRatioBoxBlog>
          <AspectRatioChild>
            <CardMedia
              component="img"
              width="100%"
              height="100%"
              alt={title}
              image={url}
            />
          </AspectRatioChild>
        </AspectRatioBoxBlog>
      </Link>
      <CardContent>
        <Stack
          sx={{ justifyContent: "space-between", gap: "8px", height: "100%" }}
        >
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
          <TextWrapper>
            <Typography variant="h5" component="div" sx={{ lineHeight: 1 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {excerpt}...
            </Typography>
          </TextWrapper>
          <ButtonWrapper>
            <Button color="secondary" onClick={() => showBlogpost(id)}>
              Read more
            </Button>
          </ButtonWrapper>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default PostCardLarge;

const StyledCardActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledCard = styled(Card)`
  && {
    max-width: 500px;
    display: grid;
    margin: 0 auto;
    flex-direction: column;
    flex-wrap: wrap;

    @media (min-width: 768px) {
      grid-template-columns: 0.8fr 1fr;
      max-width: 100%;
      flex-wrap: no-wrap;
    }
  }
`;

const Duration = styled(Typography)`
  && {
    font-size: 14px;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 768px) {
    gap: 16px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
