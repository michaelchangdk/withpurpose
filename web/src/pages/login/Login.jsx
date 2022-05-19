import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticated } from "../../reducers/authenticated";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import {
  Alert,
  AlertTitle,
  Container,
  Stack,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { client } from "../../client";

// IMPLEMENT GOOGLE LOGIN - THERES AN NPM PACKAGE I SAW

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // UNSURE ABOUT GOOGLE LOGIN - MAYBE ADD AS FEATURE LATER, or VIA oAUTH
  // const googleLogin = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

  const signin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        client
          .fetch(`*[_type == "user" && _id == "${userCredential.user.uid}"]`)
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
              })
            );
          });

        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const typeEmail = (e) => {
    setEmail(e.target.value);
  };

  const typePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container maxWidth="xs">
      <Stack spacing={2} mt={12}>
        <Typography
          variant="h1"
          fontSize={24}
          fontWeight={400}
          textAlign="center"
        >
          Sign in
        </Typography>
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          required={true}
          onChange={typeEmail}
          autoComplete="true"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          required={true}
          onChange={typePassword}
        />
        {error.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        <Button variant="contained" fullWidth size="large" onClick={signin}>
          SIGN IN
        </Button>
        <Stack direction="row" justifyContent="space-between">
          {/* FORGOT PASSWORD - HOW TO RESEND GOOGLE */}
          <Button width={6}>Forgot password?</Button>
          <Button href="/signup" width={6}>
            New here? Sign up
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Login;
