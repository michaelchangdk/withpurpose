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

const TeamCards = ({ member }) => {
  const openLinkedin = () => {
    window.open(member.linkedin, "_blank");
  };
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 375,
        height: "100%",
        bgcolor: "primary.main",
      }}
    >
      <CardMedia
        component="img"
        width="100%"
        image={urlFor(member.profilePhoto.asset._ref).url()}
        alt={member.fullName}
      />
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          bottom={0}
          mb={2}
        >
          <div>
            <Typography variant="h5" component="div">
              {member.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {member.city}
            </Typography>
          </div>
          <IconButton onClick={openLinkedin}>
            <LinkedInIcon color="secondary" fontSize="large" />
          </IconButton>
        </Stack>
        <Typography>{member.quote}</Typography>
      </CardContent>
    </Card>
  );
};

export default TeamCards;
