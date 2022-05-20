import React, { useState, useEffect } from "react";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import { useDispatch, useSelector } from "react-redux";
import { authenticated } from "../../reducers/authenticated";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { client } from "../../client";

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
    <>
      <HeaderAuth />
      Profile Page
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label="Dark Mode?"
        />
      </FormGroup>
    </>
  );
};

export default ProfilePage;
