import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticated } from "../../reducers/authenticated";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
} from "@mui/material";
import styled from "styled-components";
import logo from "../../assets/BWP_logotype.svg";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordTwo, setPasswordTwo] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // IMPLEMENT GOOGLE LOGIN - THERES AN NPM PACKAGE I SAW
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
      <Stack spacing={2} mt={12} component="form">
        <Logo src={logo} alt="logo." />
        <Typography
          variant="h1"
          fontSize={24}
          fontWeight={400}
          textAlign="center"
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
        <Button href="/login">Already have an account? Sign in</Button>
        <Divider />
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
