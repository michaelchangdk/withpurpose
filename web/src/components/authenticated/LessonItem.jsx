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
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styledcomponents/theme";

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
    const deleteQuery = [`completed[_key=="${completedLesson[0]._key}"]`];
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
        <ThemeProvider theme={theme}>
          <Checkbox
            edge="end"
            onChange={() => handleToggle(completedLesson, lesson)}
            // onChange={handleToggle}
            checked={checked}
            inputProps={{ "aria-labelledby": labelId }}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            checkedIcon={
              lesson.isVideo ? (
                <CheckCircleRoundedIcon color="green" />
              ) : (
                <CheckBoxIcon color="green" />
              )
            }
            icon={
              lesson.isVideo ? (
                <RadioButtonUncheckedRoundedIcon color="green" />
              ) : (
                <CheckBoxOutlineBlankIcon color="green" />
              )
            }
            disabled={loading}
            color="green"
          />
        </ThemeProvider>
      }
      disablePadding
    >
      <ListItemButton onClick={() => clickTask(lesson)}>
        <ThemeProvider theme={theme}>
          <ListItemIcon
            sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}
            color="pink"
          >
            {lesson.isVideo && <PlayCircleIcon color="pink" />}
            {lesson.isLink && <CloudCircleIcon color="pink" />}
            {lesson.isPDF && <DownloadForOfflineRoundedIcon color="pink" />}
          </ListItemIcon>
        </ThemeProvider>
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
