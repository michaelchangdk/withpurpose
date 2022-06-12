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
    font-size: 1.25rem;
    font-weight: 700;
    padding: 1rem;
    line-height: 1.2rem;
  }
`;

const PostThumbnail = styled.div`
  padding: 0;
  margin: 0 auto;
  width: 100%;
  height: 250px;
`;

const ThumbnailImage = styled.div`
  background-image: url('${props => props.url}');
  height: 60%;
  background-size: cover;
  background-repeat: no-repeat;
`;

export default PostCardLarge;
