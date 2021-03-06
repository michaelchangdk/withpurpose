import React from "react";
import { urlFor } from "../../client";

// MUI Imports
import {
  Card,
  Stack,
  Typography,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
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
        bgcolor: "info.main",
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
            <Typography variant="h5" component="div" fontWeight={400}>
              {member.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {member.city}
            </Typography>
          </div>
          <IconButton onClick={openLinkedin}>
            <LinkedInIcon color="primary.contrast" fontSize="large" />
          </IconButton>
        </Stack>
        <Typography>{member.quote}</Typography>
      </CardContent>
    </Card>
  );
};

export default TeamCards;
