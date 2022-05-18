import React, { useState } from "react";
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
  completedLessonRefs,
  completedLessons,
}) => {
  const [checked, setChecked] = useState(false);

  const checkItem = (lesson) => {
    console.log(lesson);
    client
      .patch(userid)
      .setIfMissing({ completed: [] })
      .insert("after", "completed[-1]", [
        {
          lessonRef: lesson._id,
          lessonTitle: lesson.title,
          userId: userid,
          completed: true,
        },
      ])
      .commit({ autoGenerateArrayKeys: true })
      .then(() => {});
  };

  const unCheckItem = (completedLesson) => {
    console.log("completed lesson", completedLesson);
    const deleteQuery = [`completed[_key=="${completedLesson._key}"]`];
    client.patch(userid).unset(deleteQuery).commit();
  };

  const handleToggle = (booleanChecked, completedLesson, lesson) => () => {
    // const currentIndex = checked.indexOf(lesson);
    // const newChecked = [...checked];
    console.log("lesson", lesson);

    if (!checked) {
      // THIS IS WHERE YOU SAVE TO SANITY
      //   newChecked.push(lesson);
      checkItem(lesson);
      setChecked(true);
    } else if (checked) {
      //   newChecked.splice(currentIndex, 1);
      // THIS IS WHERE YOU "UNSAVE" FROM SANITY
      unCheckItem(completedLesson);
      setChecked(false);
    }
    // setChecked(newChecked);
  };

  const labelId = `checkbox-list-secondary-label-${lesson.title}`;
  const completedLesson = completedLessons
    ? completedLessons.filter((a) => a.lessonRef === lesson._id)[0]
    : [];
  const booleanChecked = !!completedLessonRefs.filter((a) => a === lesson._id)
    .length;

  return (
    <ListItem
      key={lesson._id}
      secondaryAction={
        <Checkbox
          edge="end"
          // onChange={handleToggle(lesson)}
          onChange={handleToggle(booleanChecked, completedLesson, lesson)}
          // checked={checked.indexOf(lesson) !== -1}
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
