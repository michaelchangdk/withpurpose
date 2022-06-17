import React from "react";
// import {Helmet} from "react-helmet";
// import SharingModal from "./SharingModal";

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

const PostCardLarge = ({
  duration,
  title,
  url,
  id,
  excerpt,
  showBlogpost,
  openModal,
  handleOpenModal,
}) => {
  return (
    <div>
      {/* {openModal && <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name={title} description="idk" />
        <link rel="canonical" href={`https://withpurpose.netlify.app/blog/${id}`} />
      </Helmet>} */}

      <StyledCard>
        <Link onClick={() => showBlogpost(id)}>
          <CardMedia
            component="img"
            height="100%"
            max-height="10px"
            alt={title}
            image={url}
          />
        </Link>
        <div>
          <StyledCardActions>
            <Duration>{duration}</Duration>
            <Button
              sx={{ color: "text.primary" }}
              size="small"
              onClick={() => handleOpenModal(id, title, excerpt, url)}
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
    </div>
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
    max-width: 345px;
    display: grid;
    margin: 0 auto;

    @media (min-width: 768px) {
      max-width: 100%;
      grid-template-columns: 1fr 1fr;
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

export default PostCardLarge;
