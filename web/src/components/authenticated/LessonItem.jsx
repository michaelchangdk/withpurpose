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
    store.authenticated.completedLessons.filter(
      (a) => a.lessonRef === lesson._id
    )
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
          lessonRef: lesson._id,
          lessonTitle: lesson.title,
          userId: userid,
          completed: true,
        },
      ])
      .commit({ autoGenerateArrayKeys: true })
      .then(() => {
        // dispatch(
        //   authenticated.actions.addCompletedLesson({
        //     _key: lesson._id,
        //     lessonRef: lesson._id,
        //     lessonTitle: lesson.title,
        //     userId: userid,
        //     completed: true,
        //   })
        // );
      });
    setLoading(false);
  };

  const unCheckItem = (completedLesson) => {
    setLoading(true);
    const deleteQuery = [
      `completed[lessonRef=="${completedLesson[0].lessonRef}"]`,
    ];
    client
      .patch(userid)
      .unset(deleteQuery)
      .commit()
      .then(() => {
        // dispatch(authenticated.actions.removeCompletedLesson(completedLesson));
      });
    setLoading(false);
  };

  const handleToggle = () => {
    if (!checked) {
      setChecked(true);
      checkItem(lesson);
      dispatch(
        authenticated.actions.addCompletedLesson({
          _key: lesson._id,
          lessonRef: lesson._id,
          lessonTitle: lesson.title,
          userId: userid,
          completed: true,
        })
      );
    }
    if (checked) {
      setChecked(false);
      unCheckItem(completedLesson);
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
          disabled={loading}
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
