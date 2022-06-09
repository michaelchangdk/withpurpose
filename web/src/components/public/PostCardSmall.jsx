import React from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components/macro';

const PostCardLarge = ({title, url}) => {
    return (
        <PostThumbnail>
            <ThumbnailImage url={url}></ThumbnailImage>
            <PostTitle>{title}</PostTitle>
        </PostThumbnail>  
    )
};

const PostTitle = styled(Typography)`
  &&{
    font-size: 1.5rem;
    font-weight: 700;
    padding: 1rem;
    height: 100%;
  }
`;

const PostThumbnail = styled.div`
  padding: 0;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-rows: 3fr 1fr;
  height: 250px;
`;

const ThumbnailImage = styled.div`
  background-image: url('${props => props.url}');
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  height: 100%;
`;

export default PostCardLarge;
