import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";

const LessonList = ({ lessons, selectVideoUrl }) => {
  const [checked, setChecked] = useState([1]);

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

  return (
    <>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
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
                />
              }
              disablePadding
            >
              <ListItemButton onClick={() => selectVideoUrl(lesson.videoUrl)}>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${lesson.title + 1}`}
                    src={`/static/images/avatar/${lesson.title + 1}.jpg`}
                  />
                </ListItemAvatar>
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