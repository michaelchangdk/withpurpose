import React, { useState, useEffect } from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import styled from "styled-components";
import {
  List,
  Typography,
  ListSubheader,
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { client } from "../../client";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const LessonList = ({ lessons, completedLessons }) => {
  const [videoUrl, selectVideoUrl] = useState("");
  const [checked, setChecked] = useState([1]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskLink, setTaskLink] = useState("");
  const [taskLinkText, setTaskLinkText] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const userid = useSelector((store) => store.authenticated.uid);

  const completedLessonRefs = completedLessons.map((a) => a.lessonRef);

  console.log(lessons, completedLessons, completedLessonRefs);

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
    console.log(lesson);
  };

  // NOT QUITE RIGHT - ALMOST THERE
  const checkItem = (lesson) => {
    console.log(lesson);
    client
      .patch(userid)
      .setIfMissing({ completed: [] })
      .insert("after", "completed[-1]", [
        {
          _key: uuidv4(),
          lessonRef: lesson._id,
          lessonTitle: lesson.title,
          userId: userid,
          completed: true,
        },
      ])
      .commit()
      .then(() => {});
  };

  const unCheckItem = (lesson) => {
    console.log(lesson._id);
    const deleteQuery = `*[_type == "user" && uniqueid == "${userid}"][0].completed[].lessonRef match "${lesson._id}"`;
    // client.delete(deleteQuery);
    client.fetch(deleteQuery).then((response) => console.log(response));
    // .patch(userid)
    // .unset({ completed: [] })
    // .insert("after", "completed[-1]", [
    //   {
    //     userId: userid,
    //     completed: false,
    //   },
    // ])
    // .commit()
    // .then(() => {});
  };

  const handleToggle = (boolean, lesson) => () => {
    const currentIndex = checked.indexOf(lesson);
    const newChecked = [...checked];
    console.log("lesson", lesson);

    if (!boolean) {
      // THIS IS WHERE YOU SAVE TO SANITY
      newChecked.push(lesson);
      checkItem(lesson);
    } else if (boolean) {
      newChecked.splice(currentIndex, 1);
      // THIS IS WHERE YOU "UNSAVE" FROM SANITY
      unCheckItem(lesson);
    }

    setChecked(newChecked);
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
          const labelId = `checkbox-list-secondary-label-${lesson.title}`;
          console.log(
            !!completedLessonRefs.filter((a) => a === lesson._id).length
          );

          return (
            <ListItem
              key={lesson._id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  // onChange={handleToggle(lesson)}
                  onChange={handleToggle(
                    !!completedLessonRefs.filter((a) => a === lesson._id)
                      .length,
                    lesson
                  )}
                  // checked={checked.indexOf(lesson) !== -1}
                  checked={
                    !!completedLessonRefs.filter((a) => a === lesson._id).length
                  }
                  inputProps={{ "aria-labelledby": labelId }}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  checkedIcon={
                    lesson.isVideo ? (
                      <CheckCircleRoundedIcon />
                    ) : (
                      <CheckBoxIcon />
                    )
                  }
                  icon={
                    lesson.isVideo ? (
                      <RadioButtonUncheckedRoundedIcon />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )
                  }
                />
              }
              disablePadding
            >
              <ListItemButton onClick={() => clickTask(lesson)}>
                <ListItemIcon sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}>
                  {lesson.isVideo && <PlayCircleIcon />}
                  {lesson.isLink && <CloudCircleIcon />}
                  {lesson.isPDF && <DownloadForOfflineRoundedIcon />}
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${lesson.name}`}
                  secondary={`${lesson.duration}`}
                />
              </ListItemButton>
            </ListItem>
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
