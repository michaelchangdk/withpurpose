import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { auth, provider } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

const Signup = () => {
  const { setUser, setUserid } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  // UNSURE ABOUT GOOGLE LOGIN?
  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: `${firstname} ${lastname}`,
        });
        // Also create user in Sanity Studio here
        console.log(userCredential);
        console.log("Registered, please login.");
        setUser(email);
      })
      .catch((error) => {
        console.log(error.message);
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
      Sign up
      <FormGroup autoComplete="on">
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          margin="normal"
          required={true}
          onChange={typeFirstname}
        />
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          margin="normal"
          required={true}
          onChange={typeLastname}
        />
        <TextField
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          margin="normal"
          required={true}
          onChange={typeEmail}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          autoComplete="current-password"
          required={true}
          onChange={typePassword}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Join this site's community. Read more"
          checked
        />
        <Button variant="contained" onClick={register}>
          SIGN UP
        </Button>
        <Button href="/login">Already have an account? Sign in</Button>
      </FormGroup>
    </Container>
  );
};

export default Signup;
