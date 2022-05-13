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

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(
          authenticated.actions.login({
            uid: userCredential.user.uid,
            displayName: userCredential.user.displayName,
          })
        );
        // dispatch UID for tracking progress
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
            New to the site? Sign up
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Login;
