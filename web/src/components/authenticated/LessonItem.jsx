import React from "react";
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

const LessonItem = ({ handleToggle, checked, lesson, clickTask }) => {
  const labelId = `checkbox-list-secondary-label-${lesson.title}`;
  console.log(lesson);

  return (
    <ListItem
      key={lesson}
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={handleToggle(lesson)}
          checked={checked.indexOf(lesson) !== -1}
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
