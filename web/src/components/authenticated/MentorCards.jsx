import React from "react";
import {
  Card,
  Stack,
  Typography,
  CardMedia,
  CardContent,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { urlFor } from "../../client";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MentorCards = ({ mentor }) => {
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
          {/* <Typography variant="body2" color="text.secondary">
            {mentor.bio}
          </Typography> */}
        </Stack>
      </CardContent>
      <Accordion
        elevation={1}
        sx={{
          boxShadow: "none",
          //   borderTop: "none",
          //   border: 0,
          //   borderColor: "secondary.main",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="topics-content"
        >
          <Typography>{mentor.fullName.split(" ")[0]}'s bio</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            {mentor.bio}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        elevation={1}
        sx={{
          boxShadow: "none",
          //   borderTop: "none",
          //   border: 0,
          //   borderColor: "secondary.main",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="topics-content"
        >
          <Typography>
            Topics {mentor.fullName.split(" ")[0]} would love to discuss with
            you:
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            {mentor.topics.map((topic) => {
              return (
                <Typography variant="body2" color="text.secondary" key={topic}>
                  <ListItem>{topic}</ListItem>
                </Typography>
              );
            })}
          </ul>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default MentorCards;

const ListItem = styled.li`
  margin-left: 25px;
`;
