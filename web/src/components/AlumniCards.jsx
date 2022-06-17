import React from "react";
import { urlFor } from "../client";

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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          bottom={0}
        >
          <div>
            <Typography variant="h5" component="div" fontWeight={400}>
              {alumni.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {alumni.city} | {alumni.class}
            </Typography>
          </div>
          <IconButton onClick={openLinkedin}>
            <LinkedInIcon color="info" fontSize="large" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AlumniCards;
