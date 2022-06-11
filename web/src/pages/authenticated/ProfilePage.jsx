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
  Paper,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { client } from "../../client";
import { Box } from "@mui/material";
import ScrollToTop from "../ScrollToTop";
import { BackgroundBox } from "../../styledcomponents/globalstyles";
// import splotch from "../../assets/decorative/splotch.png";
// import styled from "styled-components";
// import { useEffect } from "react";

const ProfilePage = () => {
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
    if (darkMode) {
      dispatch(authenticated.actions.toggleDarkMode(false));
      client
        .patch(userid)
        .set({ darkMode: false })
        .commit()
        .then((res) => console.log(res));
    } else if (!darkMode) {
      dispatch(authenticated.actions.toggleDarkMode(true));
      client
        .patch(userid)
        .set({ darkMode: true })
        .commit()
        .then((res) => console.log(res));
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
        setSuccessPassword(
          "An email will be sent within 24 hours to you to reset your password. Don't forget to check the spamfolder."
        );
        // give user confirmation that the email was sent, and suggest looking in spam too
      })
      .catch((error) => {
        setError(error.message);
        // ..
      });
  };

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

      reauthenticateWithCredential(auth.currentUser, credential).then(
        (result) => {
          updateEmail(auth.currentUser, newEmail).then(() => {
            client
              .patch(userid)
              .set({
                email: newEmail,
              })
              .commit()
              .then((data) => {
                setSuccessEmail("Your email was successfully changed.");
              })
              .catch((error) => {
                // save error somewhere?
              });
          });
        }
      );
    }
  };

  // Fetch bookings - bidirectional fetch is somewhere in this project!!!
  // useEffect(() => {
  //   client
  //     .fetch(
  //       `*[_type == "user" && _id == "${userid}"]{
  //     "booking": *[_type == "studentMentors" && student references(_id)]
  //   }`
  //     )
  //     .then((res) => console.log(res));
  // }, []);

  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
      component="form"
    >
      {/* remove avatar from header and have it larger size and centered */}
      <HeaderAuth />
      {/* <PinkSplotch src={splotch} alt="splotch" /> */}
      {/* Profile Page */}
      <Container maxWidth="xs">
        <Stack spacing={2} mt={12}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="32px"
          >
            <Paper elevation={6}>
              {userAvatarURL.length > 0 && (
                <Avatar
                  src={userAvatarURL}
                  // src={urlFor(userAvatarURL._ref).url()}
                  alt={displayName}
                  sx={{ height: 100, width: 100, margin: "16px auto 0 auto" }}
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
                    margin: "16px auto 0 auto",
                  }}
                />
              )}
              <Typography
                sx={{ marginTop: "12px", fontSize: 25, textAlign: "center" }}
              >
                {displayName}
              </Typography>
              <FormGroup>
                <FormControlLabel
                  sx={{ margin: "12px auto" }}
                  control={
                    <Switch checked={darkMode} onChange={toggleDarkMode} />
                  }
                  label="Dark Mode?"
                />
              </FormGroup>
              <Accordion elevation={6}>
                <AccordionSummary>Change display name</AccordionSummary>
                <AccordionDetails sx={{ display: "grid", gap: 1 }}>
                  <TextField
                    label="First name"
                    variant="outlined"
                    autoComplete="First name"
                    fullWidth
                    required={true}
                    onChange={(e) => setFirstname(e.target.value)}
                  ></TextField>
                  <TextField
                    label="Last name"
                    variant="outlined"
                    autoComplete="Last name"
                    fullWidth
                    required={true}
                    onChange={(e) => setLastname(e.target.value)}
                  ></TextField>
                  <Button onClick={updateDisplayName}>
                    Change display name
                  </Button>
                </AccordionDetails>
              </Accordion>
              <Accordion elevation={6}>
                <AccordionSummary>
                  <Typography>Change email</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: "grid", gap: 1 }}>
                  <TextField
                    label="Current email address"
                    variant="outlined"
                    autoComplete="Current email address"
                    fullWidth
                    required={true}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                  />
                  <TextField
                    label="Password"
                    autoComplete="current-password"
                    variant="outlined"
                    type="password"
                    required={true}
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    label="New email address"
                    variant="outlined"
                    autoComplete="New email address"
                    fullWidth
                    required={true}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                  <TextField
                    label="Confirm new email"
                    variant="outlined"
                    autoComplete="Confirm new email"
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
                  <Button onClick={() => updateEmailAddress()}>
                    Change email
                  </Button>
                </AccordionDetails>
              </Accordion>
              <Accordion elevation={6}>
                <AccordionSummary>
                  <Typography>Reset password</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    label="Email address"
                    variant="outlined"
                    autoComplete="Email address"
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
            </Paper>
            <Paper elevation={6} sx={{ width: "100%" }}>
              <Typography
                sx={{ margin: "12px 0", fontSize: 25, textAlign: "center" }}
              >
                Booking Requests
              </Typography>
            </Paper>
          </Box>
        </Stack>
      </Container>

      <ScrollToTop />
      {/* Button to log out ?*/}
    </BackgroundBox>
  );
};

export default ProfilePage;

// const PinkSplotch = styled.img`
//   position: absolute;
//   top: 100px;
//   right: 0;
//   transform: scaleX(-1);
//   z-index: 0;
// `;
