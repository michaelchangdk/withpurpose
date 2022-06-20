import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticated } from "../../reducers/authenticated";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { client } from "../../client";
import {
  Alert,
  AlertTitle,
  Container,
  Button,
  TextField,
  Stack,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import logo from "../../assets/BWP_logotype.svg";
import GoogleIcon from "@mui/icons-material/Google";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordTwo, setPasswordTwo] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  const emailPattern =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Sign in with Google
  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        client
          .fetch(
            `*[_type == "user" && _id == "${result.user.uid}"] {approvedCommunity, approvedMasterClass, approvedMentorBooking, approvedSchool, approvedWeek0, approvedWeek1, approvedWeek23, approvedWeek4, approvedWeek5, approvedWeek6, completed, darkMode, displayName, photoURL}`
          )
          .then((res) => {
            console.log(res);
            if (res === [] || res.length === 0) {
              const doc = {
                _id: result.user.uid,
                _type: "user",
                displayName: result.user.displayName,
                uniqueid: result.user.uid,
                email: result.user.email,
                approvedSchool: false,
                approvedWeek0: false,
                approvedWeek1: false,
                approvedWeek23: false,
                approvedWeek4: false,
                approvedWeek5: false,
                approvedWeek6: false,
                approvedMasterClass: false,
                approvedMentorBooking: false,
                approvedCommunity: false,
                darkMode: false,
                photoURL: result.user.photoURL,
              };

              client.createIfNotExists(doc).then((response) => {
                console.log(response);
                dispatch(
                  authenticated.actions.login({
                    uid: result.user.uid,
                    displayName: result.user.displayName,
                    approvedSchool: false,
                    approvedWeek0: false,
                    approvedWeek1: false,
                    approvedWeek23: false,
                    approvedWeek4: false,
                    approvedWeek5: false,
                    approvedWeek6: false,
                    approvedMasterClass: false,
                    approvedMentorBooking: false,
                    approvedCommunity: false,
                    darkMode: false,
                    photoURL: result.user.photoURL,
                  })
                );
              });
              navigate("/");
            } else if (res.length > 0) {
              console.log(res);
              if (!!res[0].completed) {
                res[0].completed.forEach((lesson) =>
                  dispatch(authenticated.actions.addCompletedLesson(lesson))
                );
              }
              dispatch(
                authenticated.actions.login({
                  uid: result.user.uid,
                  displayName: result.user.displayName,
                  approvedSchool: res[0].approvedSchool,
                  approvedWeek0: res[0].approvedWeek0,
                  approvedWeek1: res[0].approvedWeek1,
                  approvedWeek23: res[0].approvedWeek23,
                  approvedWeek4: res[0].approvedWeek4,
                  approvedWeek5: res[0].approvedWeek5,
                  approvedWeek6: res[0].approvedWeek6,
                  approvedMasterClass: res[0].approvedMasterClass,
                  approvedMentorBooking: res[0].approvedMentorBooking,
                  approvedCommunity: res[0].approvedCommunity,
                  darkMode: res[0].darkMode,
                  photoURL: result.user.photoURL,
                })
              );
              navigate("/");
            }
          });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  // Register with Firebase
  const registerUser = () => {
    if (firstname.length < 2 || lastname.length < 2) {
      setError("Please fill out your name.");
      return;
    } else if (!password.match(passwordPattern)) {
      setError(
        "Password must be at least 8 characters and contain one uppercase letter, one lowercase letter, one special symbol, and one number."
      );
      return;
    } else if (password !== passwordTwo) {
      setError("Passwords do not match.");
      return;
    } else if (!email.match(emailPattern)) {
      setError("Please enter a valid email address.");
      return;
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          const user = userCredential.user;
          updateProfile(user, {
            displayName: `${firstname} ${lastname}`,
          });
          const doc = {
            _id: userCredential.user.uid,
            _type: "user",
            displayName: `${firstname} ${lastname}`,
            uniqueid: userCredential.user.uid,
            email: userCredential.user.email,
            approvedSchool: false,
            approvedWeek0: false,
            approvedWeek1: false,
            approvedWeek23: false,
            approvedWeek4: false,
            approvedWeek5: false,
            approvedWeek6: false,
            approvedMasterClass: false,
            approvedMentorBooking: false,
            approvedCommunity: false,
            darkMode: false,
            photoURL: "",
          };

          client.createIfNotExists(doc).then((response) => {
            console.log(response);
            dispatch(
              authenticated.actions.login({
                uid: userCredential.user.uid,
                displayName: `${firstname} ${lastname}`,
                approvedSchool: false,
                approvedWeek0: false,
                approvedWeek1: false,
                approvedWeek23: false,
                approvedWeek4: false,
                approvedWeek5: false,
                approvedWeek6: false,
                approvedMasterClass: false,
                approvedMentorBooking: false,
                approvedCommunity: false,
                darkMode: false,
                photoURL: "",
              })
            );

            navigate("/");
          });
        })
        .catch((error) => {
          console.log(error.message);
          if (error.message === "Firebase: Error (auth/invalid-email).") {
            setError("Please enter a valid email address.");
          } else if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            setError("Email already in use.");
          } else {
            setError(error.message);
          }
        });
    }
  };

  return (
    <Container maxWidth="xs">
      <Stack spacing={2} mt={12} mb={12} component="form">
        <IconButton
          onClick={() => navigate("/")}
          sx={{ width: "90px", margin: "0 auto" }}
        >
          <Logo src={logo} alt="With Purpose Logo." />
        </IconButton>
        <Typography
          variant="h6"
          fontSize={24}
          fontWeight={400}
          textAlign="center"
          component="h1"
        >
          Sign up
        </Typography>
        <Stack spacing={2} direction="row">
          <TextField
            label="First Name"
            variant="outlined"
            required={true}
            autoComplete="First name"
            fullWidth
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            required={true}
            autoComplete="Last name"
            fullWidth
            onChange={(e) => setLastname(e.target.value)}
          />
        </Stack>
        <TextField
          label="Email Address"
          variant="outlined"
          required={true}
          autoComplete="Email"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          autoComplete="current-password"
          required={true}
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm password"
          variant="outlined"
          type="password"
          autoComplete="current-password"
          required={true}
          fullWidth
          onChange={(e) => setPasswordTwo(e.target.value)}
        />
        {error.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={registerUser}
        >
          SIGN UP
        </Button>
        <Button onClick={() => navigate("/login")}>
          Already have an account? Sign in
        </Button>
        <Divider />
        <Button
          variant="contained"
          onClick={googleLogin}
          startIcon={<GoogleIcon />}
          size="large"
          color="info"
        >
          Sign up with Google
        </Button>
      </Stack>
    </Container>
  );
};

export default Signup;

const Logo = styled.img`
  width: 70px;
  height: 70px;
  margin: 0 auto;
`;
