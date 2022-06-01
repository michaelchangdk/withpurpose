import React from "react";
import Card from "@mui/material/Card";
import {
  Stack,
  Typography,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import { urlFor } from "../client";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const AlumniCards = ({ alumni }) => {
  const openLinkedin = () => {
    window.open(alumni.linkedin, "_blank");
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
        image={urlFor(alumni.profilePhoto.asset._ref).url()}
        alt={alumni.fullName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {alumni.fullName}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          bottom={0}
        >
          <Typography variant="body2" color="text.secondary">
            {alumni.city} | {alumni.class}
          </Typography>
          <IconButton onClick={openLinkedin}>
            <LinkedInIcon color="info" fontSize="large" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AlumniCards;
