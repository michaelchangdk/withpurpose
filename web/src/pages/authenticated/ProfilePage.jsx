import React, { useState } from "react";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import { getAuth, updateProfile, updateEmail, sendPasswordResetEmail  } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { authenticated } from "../../reducers/authenticated";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Container,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { client } from "../../client";
import { Box } from "@mui/material";

const ProfilePage = () => {
  const [checked, setChecked] = useState(false);
  const [filename, setFilename] = useState('choose image');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const [error, setError] = useState("");

  const auth = getAuth();
  const dispatch = useDispatch();
  const userid = useSelector((store) => store.authenticated.uid);
  const darkMode = useSelector((store) => store.authenticated.darkMode);

  const userAvatarUrl = useSelector((store) => store.authenticated.photoURL);
  const displayName = useSelector((store) => store.authenticated.displayName);

  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

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

  const stringAvatar = () => {
    return {
      children: `${displayName.split(" ")[0][0]}${
        displayName.split(" ")[1][0]
      }`,
    };
  };

  const updateDisplayName = () => {
    // console.log(firstname, lastname)
    if (firstname.length < 2 || lastname.length < 2) {
      setError("Please fill out your name.");
    } else {
      setError('');
      updateProfile(auth.currentUser, {... auth.currentUser,
        displayName: `${firstname} ${lastname}`
      }).then(() => {
        // Profile updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });

      client
        .patch(userid)
        .set({
          displayName: `${firstname} ${lastname}`
        })
        // .commit({ autoGenerateArrayKeys: true })
        .commit()
        .then((result) => {
          console.log(result);
          dispatch(authenticated.actions.changeDisplayname(`${firstname} ${lastname}`));
        })
    }
  };

  const resetPassword = () => {
    sendPasswordResetEmail(auth, currentEmail)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      setError(error.message)
      // ..
    });
  }

  const updateEmail = () => {
    // console.log(newEmail)
    if (newEmail !== confirmNewEmail) {
      setError("Emails do not match.");
    } else if (!newEmail.match(emailPattern)) {
      setError("Please enter a valid email address.");
    } else {
      setError('');
      updateEmail(auth.currentUser, newEmail).then(() => {
        // Email updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
      // call on client and firebase to update email?
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
      {/* remove avatar from header and have it larger size and centered */}
      <HeaderAuth />
      {/* Profile Page */}
      <Container maxWidth="xs">
        <Stack spacing={2} mt={12}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {userAvatarUrl.length > 0 && (
              <Avatar
                src={userAvatarUrl}
                alt={displayName}
                sx={{ height: 100, width: 100 }}
              />
            )}
            {userAvatarUrl.length === 0 && (
              <Avatar
                {...stringAvatar({ displayName })}
                alt={displayName}
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  height: 100,
                  width: 100,
                }}
              />
            )}
            <Typography>
              {displayName}
            </Typography>
          </Box>
          <Accordion>
            <AccordionSummary>
              Upload new profile image
            </AccordionSummary>
            <AccordionDetails>
              <Input
              accept="image/*"
              // className={classes.input}
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={(event) => setFilename(event.target.value)}
            />
            <label htmlFor="raised-button-file">
              <Button variant="raised" component="span" 
              >
              {filename}
              </Button>
            </label>
            <Button>
              Upload
            </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              Change display name
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="First name"
                variant="outlined"
                fullWidth
                required={true}
                onChange={(e) => setFirstname(e.target.value)}
                >
              </TextField>
              <TextField
                label="Last name"
                variant="outlined"
                fullWidth
                required={true}
                onChange={(e) => setLastname(e.target.value)}
                >
              </TextField>
              <Button onClick={updateDisplayName}>
                Change display name
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography>
                Change email
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* <TextField
              label="Current email address"
              variant="outlined"
              fullWidth
              required={true}
              // onChange={(e) => setEmail(e.target.value)}
              // autoComplete="Email"
              > 
              </TextField> */}
              <TextField
              label="New email address"
              variant="outlined"
              fullWidth
              required={true}
              onChange={(e) => setNewEmail(e.target.value)}
              // autoComplete="Email"
              >
              
              </TextField>
              <TextField
              label="Confirm new email"
              variant="outlined"
              fullWidth
              required={true}
              onChange={(e) => setConfirmNewEmail(e.target.value)}
              // autoComplete="Email"
              >
              
              </TextField>
              {error.length > 0 && (
                <Alert severity="warning">
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}
              <Button onClick={updateEmail}>
                Change email
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography>
                Reset password
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="Email address"
                variant="outlined"
                fullWidth
                required={true}
                onChange={(e) => setCurrentEmail(e.target.value)}
                // autoComplete="Email"
                >
                
                </TextField>
              <Button onClick={resetPassword}>
                Click to recieve email to reset password
              </Button>
              {/* Some sort of alarm to confirm that email has been sent */}
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Container>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label="Dark Mode?"
        />
      </FormGroup>
      {/* Button to log out ?*/}
    </Box>
  );
};

export default ProfilePage;
