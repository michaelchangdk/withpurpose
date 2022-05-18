import React, { useState } from "react";
import { PageContainer } from "../../styledcomponents/globalstyles";
import styled from "styled-components";
import { List, Typography, ListSubheader } from "@mui/material";
import LessonItem from "./LessonItem";
import { useSelector } from "react-redux";

const LessonList = ({ lessons, completedLessons }) => {
  const [videoUrl, selectVideoUrl] = useState("");
  // const [checked, setChecked] = useState([1]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskLink, setTaskLink] = useState("");
  const [taskLinkText, setTaskLinkText] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const userid = useSelector((store) => store.authenticated.uid);

  const completedLessonRefs = completedLessons
    ? completedLessons.map((a) => a.lessonRef)
    : [];

  console.log(
    "lessons",
    lessons,
    "completed lessons",
    completedLessons,
    "completedlesson refs",
    completedLessonRefs
  );

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

// const labelId = `checkbox-list-secondary-label-${lesson.title}`;
// const completedLesson = completedLessons
//   ? completedLessons.filter((a) => a.lessonRef === lesson._id)[0]
//   : [];
// const booleanChecked = !!completedLessonRefs.filter(
//   (a) => a === lesson._id
// ).length;

// return (
//   <ListItem
//     key={lesson._id}
//     secondaryAction={
//       <Checkbox
//         edge="end"
//         // onChange={handleToggle(lesson)}
//         onChange={handleToggle(
//           booleanChecked,
//           completedLesson,
//           lesson
//         )}
//         // checked={checked.indexOf(lesson) !== -1}
//         checked={booleanChecked}
//         inputProps={{ "aria-labelledby": labelId }}
//         sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
//         checkedIcon={
//           lesson.isVideo ? (
//             <CheckCircleRoundedIcon />
//           ) : (
//             <CheckBoxIcon />
//           )
//         }
//         icon={
//           lesson.isVideo ? (
//             <RadioButtonUncheckedRoundedIcon />
//           ) : (
//             <CheckBoxOutlineBlankIcon />
//           )
//         }
//       />
//     }
//     disablePadding
//   >
//     <ListItemButton onClick={() => clickTask(lesson)}>
//       <ListItemIcon sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}>
//         {lesson.isVideo && <PlayCircleIcon />}
//         {lesson.isLink && <CloudCircleIcon />}
//         {lesson.isPDF && <DownloadForOfflineRoundedIcon />}
//       </ListItemIcon>
//       <ListItemText
//         id={labelId}
//         primary={`${lesson.name}`}
//         secondary={`${lesson.duration}`}
//       />
//     </ListItemButton>
//   </ListItem>
// );
