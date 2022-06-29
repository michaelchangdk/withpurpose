import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

// MUI Imports
import styled from "styled-components";
import {
  List,
  Typography,
  ListSubheader,
  Fab,
  Container,
  Paper,
} from "@mui/material";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";
// Component Imports
import LessonItem from "./LessonItem";
// Styling Imports
import { FrameDiv } from "../../styledcomponents/containers";

const LessonList = ({ lessons }) => {
  const [videoUrl, selectVideoUrl] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskLink, setTaskLink] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDuration, setTaskDuration] = useState("");

  const userid = useSelector((store) => store.authenticated.uid);

  // FOR LOADING LESSON
  const clickTask = (lesson) => {
    if (lesson.isVideo === true) {
      selectVideoUrl(lesson.videoUrl);
      setTaskTitle(lesson.name);
      setTaskDuration(lesson.duration);
    } else if (lesson.isLink === true) {
      setTaskDescription(lesson.taskDescription);
      setTaskLink(lesson.otherUrl);
    } else if (lesson.isPDF === true) {
      setTaskDescription(lesson.taskDescription);
      setTaskLink(`${lesson.pdfUrl}?dl=`);
    } else {
      setTaskDescription(lesson.name);
      setTaskLink("");
    }
  };

  return (
    <Container maxWidth="lg">
      {/* CODE COACHES! This code is for a future feature (not part of our MVP but for product launch in August) */}
      {/* Using React Player - take note of className below */}
      {/* We can find ref hooks to automatically check it when the video is done playing */}
      {/* https://www.npmjs.com/package/react-player */}
      {/* https://github.com/cookpete/react-player/blob/master/src/demo/App.js */}
      {!!videoUrl && (
        <div style={{ marginBottom: "32px" }}>
          <FrameDiv>
            <ReactPlayer
              url={videoUrl}
              controls={true}
              width="100%"
              height="100%"
              className="react-player"
            />
          </FrameDiv>
          <Typography variant="caption" fontSize={14}>
            Now playing:
          </Typography>
          <Typography fontSize={16}>{taskTitle}</Typography>
          <Typography variant="caption">{taskDuration}</Typography>
        </div>
      )}
      {!!taskDescription && (
        <StyledPaper elevation={4} sx={{ maxWidth: "lg" }}>
          <TaskItem>
            <Fab
              color="info"
              size="large"
              target="_blank"
              rel="noreferrer"
              href={!!taskLink ? taskLink : ""}
            >
              {!!taskLink && <ModeOutlinedIcon sx={{ fontSize: 30 }} />}
              {!taskLink && (
                <SentimentVerySatisfiedRoundedIcon sx={{ fontSize: 30 }} />
              )}
            </Fab>
            <p>{taskDescription}</p>
          </TaskItem>
        </StyledPaper>
      )}
      <List
        dense
        sx={{
          width: "100%",
          maxWidth: "lg",
          bgcolor: "background.paper",
          mx: "auto",
          borderRadius: "4px",
        }}
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ borderRadius: "4px" }}
          >
            Content
          </ListSubheader>
        }
      >
        {lessons &&
          lessons.map((lesson) => {
            return (
              <LessonItem
                key={lesson.title}
                lesson={lesson}
                clickTask={clickTask}
                userid={userid}
              />
            );
          })}
      </List>
    </Container>
  );
};

export default LessonList;

const StyledPaper = styled(Paper)`
  && {
    padding: 12px 24px;
    margin: 0 auto 32px auto;
  }
`;

const TaskItem = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 16px;
  align-items: center;
`;
