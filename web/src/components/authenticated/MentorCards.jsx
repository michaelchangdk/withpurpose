import React from "react";
import {
  Card,
  Stack,
  Typography,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import { urlFor } from "../../client";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styled from "styled-components";

const MentorCards = ({ mentor }) => {
  console.log(mentor);
  const openLinkedin = () => {
    window.open(mentor.linkedin, "_blank");
  };
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 375,
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        width="100%"
        image={urlFor(mentor.profilePhoto.asset._ref).url()}
        alt={mentor.fullName}
      />
      <CardContent>
        <Stack direction="column" gap={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            bottom={0}
          >
            <Typography variant="h5" component="div">
              {mentor.fullName}
            </Typography>
            <IconButton onClick={openLinkedin}>
              <LinkedInIcon color="info" fontSize="large" />
            </IconButton>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {mentor.bio}
          </Typography>
          <Typography variant="body1">
            Topics {mentor.fullName.split(" ")[0]} would love to discuss with
            you:
          </Typography>
          <ul>
            {mentor.topics.map((topic) => {
              return (
                <Typography variant="body2" color="text.secondary">
                  <ListItem>{topic}</ListItem>
                </Typography>
              );
            })}
          </ul>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MentorCards;

const ListItem = styled.li`
  margin-left: 25px;
`;
