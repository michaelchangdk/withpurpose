import React from 'react';
import { Typography, Link } from '@mui/material';
import styled from 'styled-components/macro';

import SharingModal from './SharingModal';

import { Ellipsis } from '../../styledcomponents/buttons';


const PostCardLarge = ({duration, title, url, id, showBlogpost, openModal, setOpenModal}) => {

  return (
        <PostThumbnail>
            <Link onClick={() => showBlogpost(id)}>
                <ThumbnailImage url={url}></ThumbnailImage>
            </Link>
            <Grid>
                <TopRow>
                    <Duration>{duration}</Duration>
                    <SharingModal openModal={openModal} setOpenModal={setOpenModal} id={id} />
                    <Ellipsis sx={{color: "text.primary"}} onClick={() => setOpenModal(true)}>
                        ⋮
                    </Ellipsis>
                </TopRow>
                <PostTitle onClick={() => showBlogpost(id)}>{title}</PostTitle>
            </Grid>
        </PostThumbnail>  
    )
};

const Grid = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 3fr;
`

const TopRow = styled.div`
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const PostTitle = styled(Link)`
  &&{
    font-size: 2rem;
    font-weight: 700;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
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

// const Ellipsis = styled(Button)`
//   &&{
//     color: white;
//     font-size: 1rem;
//     display: flex;
//     justify-content: flex-end;
//   }
// `;

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
  cursor: pointer;
`;


export default PostCardLarge;
