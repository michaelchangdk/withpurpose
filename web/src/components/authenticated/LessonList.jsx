import React, { useState } from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import styled from "styled-components";
import { List, Typography, ListSubheader } from "@mui/material";
import LessonItem from "./LessonItem";
import { useSelector } from "react-redux";

const LessonList = ({ lessons, completedLessons, completedLessonRefs }) => {
  const [videoUrl, selectVideoUrl] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskLink, setTaskLink] = useState("");
  const [taskLinkText, setTaskLinkText] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const userid = useSelector((store) => store.authenticated.uid);

  // FOR LOADING LESSON
  const clickTask = (lesson) => {
    if (lesson.isVideo === true) {
      selectVideoUrl(lesson.videoUrl);
      setTaskTitle(lesson.name);
      setTaskDuration(lesson.duration);
    } else {
      setTaskDescription(lesson.taskDescription);
      setTaskLink(lesson.otherUrl);
      setTaskLinkText(lesson.otherUrlText);
    }
  };

  return (
    <>
      <PageContainer>
        {videoUrl.length > 0 && (
          <div>
            <FrameDiv>
              <IFrame
                title="video"
                src={videoUrl}
                allowFullScreen
                frameBorder="0"
              />
            </FrameDiv>
            <Typography>Now playing:</Typography>
            <Typography>{taskTitle}</Typography>
            <Typography>{taskDuration}</Typography>
          </div>
        )}
        {taskDescription.length > 0 && (
          <div>
            <p>{taskDescription}</p>
            <a href={taskLink} target="_blank" rel="noreferrer">
              {taskLinkText}
            </a>
          </div>
        )}
      </PageContainer>
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
        {lessons.map((lesson, index) => {
          return (
            <LessonItem
              key={`${completedLessons}${index}`}
              lesson={lesson}
              clickTask={clickTask}
              userid={userid}
              completedLessons={completedLessons}
              completedLessonRefs={completedLessonRefs}
            />
          );
        })}
      </List>
    </>
  );
};

export default LessonList;

const FrameDiv = styled.div`
  position: relative;
  padding-top: 56.25%;
`;

const IFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
