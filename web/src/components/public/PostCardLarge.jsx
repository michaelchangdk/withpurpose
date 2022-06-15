import React from 'react';
import { Typography, Link, Card, CardContent, CardMedia, CardActions, Button } from '@mui/material';
import styled from 'styled-components/macro';

import SharingModal from './SharingModal';


const PostCardLarge = ({duration, title, url, id, excerpt, showBlogpost, openModal, setOpenModal}) => {
  return (
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
    display: grid;
    margin: 0 auto;

    @media (min-width: 768px) {
      max-width: 100%;
      grid-template-columns: 1fr 1fr;
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
