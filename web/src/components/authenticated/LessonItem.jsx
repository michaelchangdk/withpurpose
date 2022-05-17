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
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const LessonItem = ({ lesson, clickTask }) => {
  const [checked, setChecked] = useState(false);
  const labelId = `checkbox-list-secondary-label-${lesson.title}`;

  const userid = useSelector((store) => store.authenticated.uid);

  // NOT QUITE RIGHT - ALMOST THERE
  const checkItem = (id) => {
    client
      .patch(id)
      .setIfMissing({ completed: [] })
      .insert("after", "completed[-1]", [
        {
          _key: uuidv4(),
          userId: userid,
          completed: true,
        },
      ])
      .commit()
      .then(() => {});
  };

  // const unCheckItem = (id) => {
  //   client
  //     .patch(id)
  //     .setIfMissing({ completed: [] })
  //     .insert("after", "completed[-1]", [
  //       {
  //         userId: userid,
  //         completed: false,
  //       },
  //     ])
  //     .commit()
  //     .then(() => {});
  // };

  const handleToggle = (value) => () => {
    console.log(value);
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];
    // console.log("value", value);

    if (!checked) {
      setChecked(true);
      // THIS IS WHERE YOU SAVE TO SANITY
      //   newChecked.push(value);
      checkItem(value._id);
    } else if (checked) {
      setChecked(false);
      //   newChecked.splice(currentIndex, 1);
      // THIS IS WHERE YOU "UNSAVE" FROM SANITY
      // unCheckItem(value._id);
    }

    // setChecked(newChecked);
  };

  console.log(lesson);

  return (
    <ListItem
      key={lesson}
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={handleToggle(lesson)}
          //   checked={checked.indexOf(lesson) !== -1}
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
