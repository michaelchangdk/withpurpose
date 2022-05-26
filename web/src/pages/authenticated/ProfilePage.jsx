import React, { useState } from "react";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import { useDispatch, useSelector } from "react-redux";
import { authenticated } from "../../reducers/authenticated";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { client } from "../../client";
import { Box } from "@mui/material";

const ProfilePage = () => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const userid = useSelector((store) => store.authenticated.uid);
  const darkMode = useSelector((store) => store.authenticated.darkMode);

  const toggleDarkMode = () => {
    if (checked) {
      setChecked(false);
      dispatch(authenticated.actions.toggleDarkMode(false));
      client.patch(userid).set({ darkMode: false }).commit();
    } else if (!checked) {
      setChecked(true);
      dispatch(authenticated.actions.toggleDarkMode(true));
      client.patch(userid).set({ darkMode: true }).commit();
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        width: "100%",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <HeaderAuth />
      Profile Page
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label="Dark Mode?"
        />
      </FormGroup>
    </Box>
  );
};

export default ProfilePage;
