import React from "react";
import { Card, Stack, Typography, CardMedia, CardContent } from "@mui/material";
import { urlFor } from "../../client";

const PublicMentorCards = (props) => {
  const mentor = props.mentor;
  const colorArray = ["primary.main", "secondary.main", "info.main"];

  const randomColor = () => {
    const randomNumber = Math.floor(Math.random() * 3);
    return colorArray[randomNumber];
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: randomColor(),
      }}
    >
      <CardMedia
        component="img"
        width="100%"
        image={urlFor(mentor.profilePhoto.asset._ref).url()}
        alt={mentor.fullName}
      />
      <CardContent>
        <Stack
          direction="column"
          justifyContent="space-between"
          bottom={0}
          gap={1}
        >
          <Typography variant="h5" component="div">
            {mentor.fullName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "16px" }}
          >
            {mentor.company}
          </Typography>
          <Typography>{mentor.bio}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PublicMentorCards;
