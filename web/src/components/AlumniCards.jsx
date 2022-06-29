import React from "react";
import { urlFor } from "../client";

// MUI Imports
import {
  Card,
  Stack,
  Typography,
  CardContent,
  IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// Styling Imports
import {
  AspectRatioBoxSquare,
  AspectRatioChild,
} from "../styledcomponents/containers";

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
      <AspectRatioBoxSquare>
        <AspectRatioChild
          backgroundimage={urlFor(alumni.profilePhoto.asset._ref).url()}
        ></AspectRatioChild>
      </AspectRatioBoxSquare>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" bottom={0}>
          <div>
            <Typography variant="h5" component="div" fontWeight={400}>
              {alumni.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {alumni.city} | {alumni.class}
            </Typography>
          </div>
          <div>
            <IconButton onClick={openLinkedin}>
              <LinkedInIcon color="info" fontSize="large" />
            </IconButton>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AlumniCards;
