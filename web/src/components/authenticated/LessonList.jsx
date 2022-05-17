import React, { useState } from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import styled from "styled-components";
import { List, Typography, ListSubheader } from "@mui/material";
import LessonItem from "./LessonItem";
import { client } from "../../client";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const LessonList = ({ lessons }) => {
  const [videoUrl, selectVideoUrl] = useState("");
  const [checked, setChecked] = useState([1]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskLink, setTaskLink] = useState("");
  const [taskLinkText, setTaskLinkText] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const userid = useSelector((store) => store.authenticated.uid);

  // NOT QUITE RIGHT - ALMOST THERE
  const checkItem = (id) => {
    client
      .patch(id)
      .setIfMissing({ completed: [] })
      .insert("after", "completed[-1]", [
        {
          key: uuidv4(),
          userId: userid,
          completed: true,
        },
      ])
      .commit()
      .then(() => {});
  };

  // const unCheckItem = (id) => {
  //   client
  //     .patch(id)
  //     .setIfMissing({ completed: [] })
  //     .insert("after", "completed[-1]", [
  //       {
  //         userId: userid,
  //         completed: false,
  //       },
  //     ])
  //     .commit()
  //     .then(() => {});
  // };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    console.log("value", value);

    if (currentIndex === -1) {
      // THIS IS WHERE YOU SAVE TO SANITY
      newChecked.push(value);
      checkItem(value._id);
    } else {
      newChecked.splice(currentIndex, 1);
      // THIS IS WHERE YOU "UNSAVE" FROM SANITY
      // unCheckItem(value._id);
    }

    setChecked(newChecked);
  };

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
    console.log(lesson);
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
        {lessons.map((lesson) => {
          return (
            <LessonItem
              key={lesson._id}
              handleToggle={handleToggle}
              checked={checked}
              lesson={lesson}
              clickTask={clickTask}
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
