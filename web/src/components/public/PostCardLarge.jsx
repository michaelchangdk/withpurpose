import React from 'react';
import { Typography, Button } from '@mui/material';
import styled from 'styled-components/macro';

const PostCardLarge = ({duration, title, url}) => {
    return (
        <PostThumbnail>
            <div>
                <ThumbnailImage url={url}></ThumbnailImage>
            </div>
            <div>
                <TopRow>
                    <Duration>{duration}</Duration>
                    <Ellipsis>
                        ⋮
                    </Ellipsis>
                </TopRow>
                <PostTitle>{title}</PostTitle>
            </div>
        </PostThumbnail>  
    )
};

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const PostTitle = styled(Typography)`
  &&{
    font-size: 2rem;
    font-weight: 700;
  }
`;

const Duration = styled(Typography)`
  &&{
    font-size: .725rem;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const Ellipsis = styled(Button)`
  &&{
    color: white;
    font-size: 1rem;
    display: flex;
    justify-content: flex-end;
  }
`;

const PostThumbnail = styled.div`
  padding: 0;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const ThumbnailImage = styled.div`
  background-image: url('${props => props.url}');
  width: 100%;
  height: 100%;
  min-height: 200px;
  background-size: cover;
`;


export default PostCardLarge;