import React, { useState } from "react";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import {
  EmailAuthProvider,
  getAuth,
  updateProfile,
  updateEmail,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { authenticated } from "../../reducers/authenticated";
// import { urlFor } from "../../client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Container,
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
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [error, setError] = useState("");
  const [successEmail, setSuccessEmail] = useState("");
  const [successPassword, setSuccessPassword] = useState("");
  const userAvatarURL = useSelector((store) => store.authenticated.photoURL);

  const auth = getAuth();
  const dispatch = useDispatch();
  const userid = useSelector((store) => store.authenticated.uid);
  const darkMode = useSelector((store) => store.authenticated.darkMode);

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
    //
    if (firstname.length < 2 || lastname.length < 2) {
      setError("Please fill out your name.");
    } else {
      setError("");
      updateProfile(auth.currentUser, {
        ...auth.currentUser,
        displayName: `${firstname} ${lastname}`,
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
        });

      client
        .patch(userid)
        .set({
          displayName: `${firstname} ${lastname}`,
        })
        .commit()
        .then((result) => {
          dispatch(
            authenticated.actions.changeDisplayname(`${firstname} ${lastname}`)
          );
        });
    }
  };

  const resetPassword = () => {
    sendPasswordResetEmail(auth, currentEmail)
    .then(() => {
      setSuccessPassword("An email will be sent within 24 hours to you to reset your password. Don't forget to check the spamfolder.")
      // give user confirmation that the email was sent, and suggest looking in spam too
    })
    .catch((error) => {
      setError(error.message)
      // ..
    });
  }

  const updateEmailAddress = () => {
    if (newEmail !== confirmNewEmail) {
      setError("Emails do not match.");
    } else if (!newEmail.match(emailPattern)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      //
      let credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      
      reauthenticateWithCredential(auth.currentUser, credential)
      .then(result => {
        updateEmail(auth.currentUser, newEmail).then(() => {
          client
            .patch(userid)
            .set({
              email: newEmail
            })
            .commit()
            .then((data) => {
              setSuccessEmail('Your email was successfully changed.')
            })
            .catch((error) => {
              // save error somewhere?
            });
        })
    })
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
            {userAvatarURL.length > 0 && (
              <Avatar
                src={userAvatarURL}
                // src={urlFor(userAvatarURL._ref).url()}
                alt={displayName}
                sx={{ height: 100, width: 100 }}
              />
            )}
            {userAvatarURL.length === 0 && (
              <Avatar
                {...stringAvatar({ displayName })}
                alt={displayName}
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  height: 100,
                  width: 100,
                  fontSize: 35,
                }}
              />
            )}
            <Typography sx={{ marginTop: "10px", fontSize: 25 }}>
              {displayName}
            </Typography>
          </Box>
          <Accordion>
            <AccordionSummary>Change display name</AccordionSummary>
            <AccordionDetails sx={{ display: "grid", gap: 1 }}>
              <TextField
                label="First name"
                variant="outlined"
                fullWidth
                required={true}
                onChange={(e) => setFirstname(e.target.value)}
              ></TextField>
              <TextField
                label="Last name"
                variant="outlined"
                fullWidth
                required={true}
                onChange={(e) => setLastname(e.target.value)}
              ></TextField>
              <Button onClick={updateDisplayName}>Change display name</Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography>Change email</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "grid", gap: 1 }}>
              <TextField
                label="Current email address"
                variant="outlined"
                fullWidth
                required={true}
                onChange={(e) => setCurrentEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                required={true}
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="New email address"
                variant="outlined"
                fullWidth
                required={true}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <TextField
                label="Confirm new email"
                variant="outlined"
                fullWidth
                required={true}
                onChange={(e) => setConfirmNewEmail(e.target.value)}
              />
              {successEmail.length > 0 && (
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  {successEmail}
                </Alert>
              )}
              {error.length > 0 && (
                <Alert severity="warning">
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}
              <Button onClick={updateEmailAddress}>Change email</Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography>Reset password</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="Email address"
                variant="outlined"
                fullWidth
                required={true}
                onChange={(e) => setCurrentEmail(e.target.value)}
                />
              {successPassword.length > 0 && (
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  {successPassword}
                </Alert>
              )}
              <Button onClick={resetPassword}>
                Click to recieve email to reset password
              </Button>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Container>
      <FormGroup>
        <FormControlLabel
          sx={{ margin: "10px auto" }}
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label="Dark Mode?"
        />
      </FormGroup>
      {/* Button to log out ?*/}
    </Box>
  );
};
}

export default ProfilePage;
