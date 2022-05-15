import React, { useState } from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import styled from "styled-components";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Checkbox,
  Typography,
  ListSubheader,
  ListItemIcon,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const LessonList = ({ lessons }) => {
  const [videoUrl, selectVideoUrl] = useState("");
  const [checked, setChecked] = useState([1]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskLink, setTaskLink] = useState("");
  const [taskLinkText, setTaskLinkText] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDuration, setTaskDuration] = useState("");

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
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
          const labelId = `checkbox-list-secondary-label-${lesson.title}`;
          return (
            <ListItem
              key={lesson.title}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(lesson.title)}
                  checked={checked.indexOf(lesson.title) !== -1}
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
