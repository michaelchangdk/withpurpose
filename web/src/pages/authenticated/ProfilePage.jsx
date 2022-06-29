import React, { useState } from "react";
import { client } from "../../client";
import { useDispatch, useSelector } from "react-redux";
import { authenticated } from "../../reducers/authenticated";

// Firebase Auth Imports
import {
  EmailAuthProvider,
  getAuth,
  updateProfile,
  updateEmail,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
} from "firebase/auth";

// MUI Imports
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Box,
  Container,
  Stack,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
// Component Imports
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import { BackgroundBox } from "../../styledcomponents/containers";
// Function Imports
import {
  toggleDarkMode,
  FetchBookingRequests,
} from "../../services/clientFunctions";
import { stringAvatar } from "../../helpers/functions";

const ProfilePage = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const userAvatarURL = useSelector((store) => store.authenticated.photoURL);
  const userid = useSelector((store) => store.authenticated.uid);
  const darkMode = useSelector((store) => store.authenticated.darkMode);
  const displayName = useSelector((store) => store.authenticated.displayName);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [error, setError] = useState("");
  const [successEmail, setSuccessEmail] = useState("");
  const [successPassword, setSuccessPassword] = useState("");

  const emailPattern =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const updateDisplayName = () => {
    //
    if (firstname.length < 2 || lastname.length < 2) {
      setError("Please fill out your name.");
    } else {
      setError("");
      updateProfile(auth.currentUser, {
        ...auth.currentUser,
        displayName: `${firstname} ${lastname}`,
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
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const updateEmailAddress = () => {
    if (newEmail !== confirmNewEmail) {
      setError("Emails do not match.");
    } else if (!newEmail.match(emailPattern)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      let credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );

      reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
          updateEmail(auth.currentUser, newEmail).then(() => {
            client
              .patch(userid)
              .set({
                email: newEmail,
              })
              .commit()
              .then(() => {
                setSuccessEmail("Your email was successfully changed.");
              });
          });
        })
        .catch((error) => {
          if (error.message === "Firebase: Error (auth/wrong-password).") {
            setError("Incorrect password.");
          } else {
            setError(error.message);
          }
        });
    }
  };

  const [bookingRequests] = FetchBookingRequests(userid);

  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
      component="form"
    >
      <HeaderAuth />
      <Container maxWidth="xs">
        <Stack spacing={2} mt={12}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="32px"
            marginBottom="32px"
          >
            <Paper elevation={2}>
              {userAvatarURL.length > 0 && (
                <Avatar
                  src={userAvatarURL}
                  alt={displayName}
                  sx={{ height: 100, width: 100, margin: "16px auto 0 auto" }}
                />
              )}
              {userAvatarURL.length === 0 && (
                <Avatar
                  {...stringAvatar(displayName)}
                  alt={displayName}
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    height: 100,
                    width: 100,
                    fontSize: 35,
                    margin: "16px auto 0 auto",
                    padding: "6px 0 0 0",
                  }}
                />
              )}
              <Typography
                sx={{ marginTop: "12px", fontSize: 26, textAlign: "center" }}
                variant="h4"
              >
                {displayName}
              </Typography>
              <FormGroup>
                <FormControlLabel
                  sx={{ margin: "12px auto" }}
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={() =>
                        toggleDarkMode(
                          userid,
                          darkMode,
                          dispatch,
                          authenticated
                        )
                      }
                    />
                  }
                  label="Dark Mode?"
                />
              </FormGroup>
              <Accordion elevation={2}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  Change display name
                </AccordionSummary>
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
              <Accordion elevation={2}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Change email</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: "grid", gap: 1 }}>
                  {/* <TextField
                    label="Current email address"
                    variant="outlined"
                    autoComplete="Current email address"
                    fullWidth
                    required={true}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                  /> */}
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
              <Accordion elevation={2}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
            <Paper elevation={2} sx={{ width: "100%" }}>
              <Accordion elevation={2}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    sx={{
                      fontSize: 26,
                    }}
                    variant="h4"
                  >
                    Booking Requests
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {!!bookingRequests ? (
                      bookingRequests.map((booking) => (
                        <ListItem key={booking._key}>
                          <ListItemAvatar>
                            <ScheduleIcon sx={{ fontSize: "32px" }} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={booking.mentor}
                            secondary={booking.datetime}
                          />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemAvatar>
                          <ErrorOutlineRoundedIcon sx={{ fontSize: "32px" }} />
                        </ListItemAvatar>
                        <ListItemText primary="No booking requests" />
                      </ListItem>
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Box>
        </Stack>
      </Container>
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default ProfilePage;
