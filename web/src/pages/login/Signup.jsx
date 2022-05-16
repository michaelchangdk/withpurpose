import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticated } from "../../reducers/authenticated";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  Alert,
  AlertTitle,
  Container,
  Button,
  // Checkbox,
  // FormControlLabel,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import { client } from "../../client";

// IMPLEMENT GOOGLE LOGIN - THERES AN NPM PACKAGE I SAW

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
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

  const register = () => {
    // ADD AUTHENTICATION FOR FIRST AND LAST NAME! Disable / don't allow
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        const user = userCredential.user;
        updateProfile(user, {
          displayName: `${firstname} ${lastname}`,
        });
        // Also create user in Sanity Studio here

        // PULL IN LIST OF LESSONS FROM SANITY - SEND IT AS AN OBJECT W USER CREATION
        // GET ID OF TASK + BOOLEAN
        // AND ADD BOOLEAN FOR COMPLETION
        const doc = {
          _id: userCredential.user.uid,
          _type: "user",
          displayName: `${firstname} ${lastname}`,
          uniqueid: userCredential.user.uid,
          email: userCredential.user.email,
        };

        // userCredential.user.email;
        // userCredential.user.uid
        // userCredential.user.displayName = firstname + lastname

        client.createIfNotExists(doc).then(() => {
          // dispatch UID for tracking progress
          dispatch(
            authenticated.actions.login({
              uid: userCredential.user.uid,
              displayName: `${firstname} ${lastname}`,
            })
          );
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const typeFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const typeLastname = (e) => {
    setLastname(e.target.value);
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
          Sign up
        </Typography>

        <Stack spacing={2} direction="row">
          <TextField
            label="First Name"
            variant="outlined"
            required={true}
            autoComplete="true"
            fullWidth
            onChange={typeFirstname}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            required={true}
            autoComplete="true"
            fullWidth
            onChange={typeLastname}
          />
        </Stack>
        <TextField
          label="Email Address"
          variant="outlined"
          required={true}
          autoComplete="true"
          fullWidth
          onChange={typeEmail}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          required={true}
          fullWidth
          onChange={typePassword}
        />
        {/* Add text next to checkbox? */}
        {/* <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Join this site's community. Read more"
        /> */}
        {error.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        <Button variant="contained" fullWidth size="large" onClick={register}>
          SIGN UP
        </Button>
        <Button href="/login">Already have an account? Sign in</Button>
      </Stack>
    </Container>
  );
};

export default Signup;
