import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticated } from "../../reducers/authenticated";

// MUI Imports
import {
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
// Function Imports
import { checkLesson, uncheckLesson } from "../../services/clientFunctions";

const LessonItem = ({ lesson, clickTask, userid }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const labelId = `checkbox-list-secondary-label-${lesson.title}`;
  const completedLesson = useSelector((store) =>
    store.authenticated.completedLessons.filter(
      (a) => a.lessonReference === lesson._id
    )
  );

  useEffect(() => {
    if (completedLesson.length > 0) {
      setChecked(true);
    }
  }, [completedLesson.length]);

  const handleToggle = () => {
    if (!checked) {
      setChecked(true);
      checkLesson(userid, lesson);
      dispatch(
        authenticated.actions.addCompletedLesson({
          _key: lesson._id,
          lessonReference: lesson._id,
          lessonTitle: lesson.title,
          userId: userid,
          completed: true,
        })
      );
    }
    if (checked) {
      setChecked(false);
      uncheckLesson(userid, completedLesson);
      dispatch(authenticated.actions.removeCompletedLesson(completedLesson));
    }
  };

  return (
    <ListItem
      key={lesson._id}
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={() => handleToggle(completedLesson, lesson)}
          // onChange={handleToggle}
          checked={checked}
          inputProps={{ "aria-labelledby": labelId }}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          checkedIcon={
            lesson.isVideo ? (
              <CheckCircleRoundedIcon color="success" />
            ) : (
              <CheckBoxIcon color="success" />
            )
          }
          icon={
            lesson.isVideo ? (
              <RadioButtonUncheckedRoundedIcon color="success" />
            ) : (
              <CheckBoxOutlineBlankIcon color="success" />
            )
          }
          color="success"
        />
      }
      disablePadding
    >
      <ListItemButton onClick={() => clickTask(lesson)}>
        <ListItemIcon
          sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}
          color="secondary"
        >
          {lesson.isVideo && <PlayCircleIcon color="secondary" />}
          {lesson.isLink && <CloudCircleIcon color="secondary" />}
          {lesson.isPDF && <DownloadForOfflineRoundedIcon color="secondary" />}
        </ListItemIcon>
        <ListItemText
          id={labelId}
          primary={`${lesson.name}`}
          secondary={`${lesson.duration}`}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default LessonItem;
