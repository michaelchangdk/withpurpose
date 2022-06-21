import React from "react";
import { urlFor } from "../../client";
import { useNavigate } from "react-router-dom";

// MUI Imports
import {
  Card,
  Stack,
  Typography,
  CardContent,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Styling Imports
import styled from "styled-components/macro";
import {
  AspectRatioBoxSquare,
  AspectRatioChild,
} from "../../styledcomponents/containers";

const MentorCards = ({ mentor }) => {
  const openLinkedin = () => {
    window.open(mentor.linkedin, "_blank");
  };
  const navigate = useNavigate();

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
          backgroundimage={urlFor(mentor.profilePhoto.asset._ref).url()}
          // xposition={coverImage.crop.top}
          // yposition={coverImage.hotspot.y}
        ></AspectRatioChild>
      </AspectRatioBoxSquare>
      <CardContent>
        <Stack direction="column" gap={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            bottom={0}
            sx={{ minHeight: "65px" }}
          >
            <Typography variant="h5" fontWeight={400}>
              {mentor.fullName}
            </Typography>
            <IconButton onClick={openLinkedin}>
              <LinkedInIcon color="info" fontSize="large" />
            </IconButton>
          </Stack>
          <Button
            variant="contained"
            sx={{ margin: "0 auto" }}
            onClick={() => navigate(`/book-a-mentor/${mentor._id}`)}
          >
            Book now
          </Button>
        </Stack>
      </CardContent>
      <Accordion
        elevation={1}
        sx={{
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="topics-content"
        >
          <Typography>{mentor.fullName.split(" ")[0]}'s bio</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Bio>
            <Typography color="text.secondary" fontSize={14} lineHeight={1.6}>
              {mentor.bio}
            </Typography>
          </Bio>
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
                <Typography
                  color="text.secondary"
                  fontSize={14}
                  lineHeight={1.6}
                  key={topic}
                >
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

const Bio = styled.div`
  white-space: pre-line;
  vertical-align: bottom;
`;
