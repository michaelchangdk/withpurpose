import React, { useState } from "react";
import styled from "styled-components";
import {
  List,
  Typography,
  ListSubheader,
  Fab,
  Container,
  Paper,
} from "@mui/material";
import LessonItem from "./LessonItem";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
// import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import MouseIcon from "@mui/icons-material/Mouse";

const LessonList = ({
  lessons,
  // completedLessonRefs
}) => {
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
    } else {
      setTaskDescription(lesson.taskDescription);
      setTaskLink(`${lesson.pdfUrl}?dl=`);
    }
  };

  return (
    <Container maxWidth="xl">
      {/* {videoUrl.length > 0 && (
          <div>
            <FrameDiv>
              <IFrame
                title="video"
                src={videoUrl}
                allowFullScreen
                frameBorder="0"
              />
            </FrameDiv>
            <Typography variant="caption" fontSize={13}>
              Now playing:
            </Typography>
            <Typography fontSize={16}>{taskTitle}</Typography>
            <Typography variant="caption">{taskDuration}</Typography>
          </div>
        )} */}

      {/* Using React Player - take note of className below */}
      {/* We can find ref hooks to automatically check it when the video is done playing */}
      {/* https://www.npmjs.com/package/react-player */}
      {/* https://github.com/cookpete/react-player/blob/master/src/demo/App.js */}
      {videoUrl.length > 0 && (
        <Container maxWidth="xl">
          <FrameDiv>
            <ReactPlayer
              url={videoUrl}
              controls={true}
              width="100%"
              height="100%"
              className="react-player"
            />
          </FrameDiv>
          <Typography variant="caption" fontSize={13}>
            Now playing:
          </Typography>
          <Typography fontSize={16}>{taskTitle}</Typography>
          <Typography variant="caption">{taskDuration}</Typography>
        </Container>
      )}
      {taskDescription.length > 0 && (
        <Paper maxwidth="xl" elevation={6} sx={{ padding: "10px 20px" }}>
          <TaskItem>
            <p>{taskDescription}</p>
            <Fab
              color="info"
              size="large"
              target="_blank"
              rel="noreferrer"
              href={taskLink}
            >
              {/* <ModeOutlinedIcon sx={{ fontSize: 30 }} /> */}
              <MouseIcon sx={{ fontSize: 30 }} />
            </Fab>
          </TaskItem>
        </Paper>
      )}
      <List
        dense
        sx={{
          width: "100%",
          // maxWidth: 600,
          bgcolor: "background.paper",
          mx: "auto",
        }}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Content
          </ListSubheader>
        }
      >
        {lessons &&
          lessons.map((lesson, index) => {
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

const FrameDiv = styled.div`
  position: relative;
  padding-top: 56.25%;
`;

// const IFrame = styled.iframe`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// `;

const TaskItem = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 16px;
  align-items: center;
`;
