import React from "react";
import { Card, Stack, Typography, CardMedia, CardContent } from "@mui/material";
import { urlFor } from "../../client";

const PublicMentorCards = (props) => {
  const mentor = props.mentor;

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "secondary.main",
        maxWidth: 375,
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
          <div>
            <Typography variant="h5" component="div" fontWeight={400}>
              {mentor.fullName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              // sx={{ fontSize: "16px" }}
            >
              {mentor.company}
            </Typography>
          </div>
          <Typography>{mentor.bio}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PublicMentorCards;
