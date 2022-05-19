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

const LessonItem = ({
  lesson,
  clickTask,
  userid,
  // completedLessonRefs,
  completedLessons,
}) => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const labelId = `checkbox-list-secondary-label-${lesson.title}`;
  let completedLesson = completedLessons
    ? completedLessons.filter((a) => a.lessonRef === lesson._id)[0]
    : [];
  // const booleanChecked = !!completedLessonRefs.filter((a) => a === lesson._id)
  //   .length;

  // useEffect(() => {
  //   if (booleanChecked) {
  //     setChecked(true);
  //   }
  // }, []);

  const checkItem = (lesson) => {
    setLoading(true);
    console.log("item checked completed", lesson);
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
      .then(() => {});
    setLoading(false);
  };

  const unCheckItem = (completedLesson) => {
    setLoading(true);
    console.log("item unchecked", completedLesson);
    const deleteQuery = [`completed[_key=="${completedLesson._key}"]`];
    client
      .patch(userid)
      .unset(deleteQuery)
      .commit()
      .then(() => {});
    setLoading(false);
  };

  const handleToggle =
    // completedLesson, lesson
    () => {
      console.log("is checked?", checked);
      if (!checked) {
        console.log(
          "boolean not checked - setting checked to true and sending to sanity"
        );
        setChecked(true);
        checkItem(lesson);
      }
      if (checked) {
        console.log(
          "boolean checked - setting checked to false and sending to sanity"
        );
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
