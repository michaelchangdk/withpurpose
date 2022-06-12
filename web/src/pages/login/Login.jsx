import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { client } from "../../client";
import { authenticated } from "../../reducers/authenticated";
import {
  Alert,
  AlertTitle,
  Container,
  Stack,
  Button,
  TextField,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import logo from "../../assets/BWP_logotype.svg";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

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
            if (res === []) {
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
            } else {
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

  // Sign in with Firebase
  const signin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        client
          .fetch(
            `*[_type == "user" && _id == "${userCredential.user.uid}"] {approvedCommunity, approvedMasterClass, approvedMentorBooking, approvedSchool, approvedWeek0, approvedWeek1, approvedWeek23, approvedWeek4, approvedWeek5, approvedWeek6, completed, darkMode, displayName, photoURL}`
          )
          .then((res) => {
            if (!!res[0].completed) {
              res[0].completed.forEach((lesson) =>
                dispatch(authenticated.actions.addCompletedLesson(lesson))
              );
            }
            dispatch(
              authenticated.actions.login({
                uid: userCredential.user.uid,
                displayName: userCredential.user.displayName,
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
                photoURL: userCredential.photoURL
                  ? userCredential.photoURL
                  : "",
              })
            );
          });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          setError("Wrong password");
        } else if (error.message === "Firebase: Error (auth/user-not-found).") {
          setError("User not found");
        } else {
          setError(error.message);
        }
      });
  };

  // Send Password Reset Email
  const sendPassWordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        setAlert("Password reset email sent!");
        setEmail("");
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          setError("User not found");
        } else {
          setError(error.message);
        }
      });
  };

  return (
    <Container maxWidth="xs">
      <Stack spacing={2} mt={12} component="form">
        <IconButton
          onClick={() => navigate("/")}
          sx={{ width: "90px", margin: "0 auto" }}
        >
          <Logo src={logo} alt="With Purpose Logo." />
        </IconButton>
        <Typography
          variant="h6"
          fontSize={24}
          fontWeight={500}
          textAlign="center"
          component="h1"
        >
          Sign in
        </Typography>
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          required={true}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="Email"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          autoComplete="current-password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        {alert.length > 0 && <Alert severity="success">{alert}</Alert>}
        <Button variant="contained" fullWidth size="large" onClick={signin}>
          SIGN IN
        </Button>
        <Stack direction="row" justifyContent="space-between">
          {/* FORGOT PASSWORD - HOW TO RESEND GOOGLE */}
          <Button width={6} onClick={sendPassWordReset}>
            Forgot password?
          </Button>
          <Button onClick={() => navigate("/signup")} width={6}>
            New here? Sign up
          </Button>
        </Stack>
        <Divider />
        <Button
          variant="contained"
          onClick={googleLogin}
          startIcon={<GoogleIcon />}
          size="large"
          color="info"
        >
          Sign in with Google
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;

const Logo = styled.img`
  width: 70px;
  height: 70px;
  margin: 0 auto;
`;
