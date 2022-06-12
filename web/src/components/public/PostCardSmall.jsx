import React from 'react';
import { Typography, Card, CardActionArea, CardContent } from '@mui/material';
import styled from 'styled-components/macro';

const PostCardSmall = ({title, url}) => {
    return (
      <Card
      sx={{
        width: "100%",
        maxWidth: "sm"
      }}
    >
      <CardActionArea
        sx={{ height: "100%", display: "grid" }}
      >
        <AspectRatioBox>
          <AspectRatioChild
            backgroundimage={url}
          ></AspectRatioChild>
        </AspectRatioBox>
        <CardContent sx={{ alignSelf: "start", height: "100%" }}>
          <Typography
            gutterBottom
            variant="h5"
            fontWeight={400}
            component="div"
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )
};

const AspectRatioBox = styled.div`
  height: 0;
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
  align-self: start;
`;

const AspectRatioChild = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.backgroundimage});
  background-position-x: ${(props) => props.xposition * 100}%;
  background-position-y: ${(props) => props.yposition * 100}%;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default PostCardSmall;
