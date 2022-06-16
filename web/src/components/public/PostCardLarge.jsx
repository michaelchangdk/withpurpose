import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Link, Card, CardContent, CardMedia, CardActions, Button } from '@mui/material';
import styled from 'styled-components/macro';

import SharingModal from './SharingModal';
// , showBlogpost, openModal, setOpenModal

const PostCardLarge = ({duration, title, url, id, excerpt}) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const showBlogpost = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <StyledCard>
      <Link sx={{maxHeight: "300px", maxWidth: "300px"}} onClick={() => showBlogpost(id)}>
        <CardMedia
          component="img"
          width="100%"
          height="100%"
          alt={title}
          image={url}
        />
      </Link>
      <div style={{maxWidth: "50%"}}>
        <StyledCardActions>
          <Duration>{duration}</Duration>
          <SharingModal openModal={openModal} setOpenModal={setOpenModal} id={id} />
          <Button sx={{color: "text.primary"}} size="small" onClick={() => setOpenModal(true)}>Share</Button>
        </StyledCardActions>
        <Link onClick={() => showBlogpost(id)} sx={{color: "text.primary", textDecoration: "none"}}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{lineHeight: 1}}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {excerpt}...
            </Typography>
          </CardContent>
        </Link>
      </div>
    </StyledCard>
  )
};

const StyledCardActions = styled(CardActions)`
  &&{
    display: flex;
    justify-content: space-between;
  }
`;

const StyledCard = styled(Card)`
  &&{
    max-width: 345px;
    display: flex;
    margin: 0 auto;

    flex-wrap: wrap;

    @media (min-width: 768px) {
      max-width: 100%;
      flex-wrap: no-wrap;
    }
  }

 
`;

const Duration = styled(Typography)`
  &&{
    padding: 0 8px;
    font-size: .725rem;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

export default PostCardLarge;
