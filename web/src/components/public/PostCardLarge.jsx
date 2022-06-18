import React from "react";
import { useNavigate } from "react-router-dom";
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
import SharingModal from "./SharingModal";
// , showBlogpost, openModal, setOpenModal

const PostCardLarge = ({
  duration,
  title,
  url,
  id,
  excerpt,
  // showBlogpost,
  openModal,
  // handleOpenModal,
  setOpenModal,
}) => {
  // const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const showBlogpost = (id) => {
    navigate(`/blog/${id}`);
  };
  return (
    <StyledCard>
      <Link
        sx={{ maxHeight: "300px", maxWidth: "50%" }}
        onClick={() => showBlogpost(id)}
      >
        <CardMedia
          component="img"
          width="100%"
          height="100%"
          alt={title}
          image={url}
        />
      </Link>
      <div style={{ maxWidth: "50%" }}>
        <StyledCardActions>
          <Duration>{duration}</Duration>
          {/* <SharingModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            id={id}
            title={title}
            excerpt={excerpt}
            image={image}
          /> */}
          <Button
            sx={{ color: "text.primary" }}
            size="small"
            onClick={() => setOpenModal(true)}
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
      {/* <div>
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
      </div> */}
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
    max-width: 345px;
    display: flex;
    margin: 0 auto;
    flex-direction: column;

    flex-wrap: wrap;

    @media (min-width: 768px) {
      flex-direction: row;
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
