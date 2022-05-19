import React, { useEffect, useState } from "react";
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
import { client } from "../../client";
import { useSelector, useDispatch } from "react-redux";
import { authenticated } from "../../reducers/authenticated";

const LessonItem = ({ lesson, clickTask, userid }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const labelId = `checkbox-list-secondary-label-${lesson.title}`;

  const completedLesson = useSelector((store) =>
    store.authenticated.completedLessons.filter((a) => a._key === lesson._id)
  );

  useEffect(() => {
    if (completedLesson.length > 0) {
      setChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkItem = (lesson) => {
    setLoading(true);
    client
      .patch(userid)
      .setIfMissing({
        completed: [],
      })
      .insert("after", "completed[-1]", [
        {
          _key: lesson._id,
          lessonRef: lesson._id,
          lessonTitle: lesson.title,
          userId: userid,
          completed: true,
        },
      ])
      // .commit({ autoGenerateArrayKeys: true })
      .commit()
      .then(() => {
        dispatch(
          authenticated.actions.addCompletedLesson({
            _key: lesson._id,
            lessonRef: lesson._id,
            lessonTitle: lesson.title,
            userId: userid,
            completed: true,
          })
        );
      });
    setLoading(false);
  };

  const unCheckItem = (completedLesson) => {
    setLoading(true);
    const deleteQuery = [`completed[_key=="${completedLesson[0]._key}"]`];
    client
      .patch(userid)
      .unset(deleteQuery)
      .commit()
      .then((response) => {
        dispatch(authenticated.actions.removeCompletedLesson(completedLesson));
      });
    setLoading(false);
  };

  const handleToggle = () => {
    if (!checked) {
      setChecked(true);
      checkItem(lesson);
    }
    if (checked) {
      setChecked(false);
      unCheckItem(completedLesson);
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
            lesson.isVideo ? <CheckCircleRoundedIcon /> : <CheckBoxIcon />
          }
          icon={
            lesson.isVideo ? (
              <RadioButtonUncheckedRoundedIcon />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )
          }
          disabled={loading}
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
};

export default LessonItem;
