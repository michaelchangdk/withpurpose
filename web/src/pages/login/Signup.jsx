import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { auth, provider } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Signup = () => {
  const { setUser, setUserid } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      .then(() => {
        // Also create user in Sanity Studio here
        console.log("Registered, please login.");
        setUser(email);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Container>
      Sign up
      <FormGroup>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            margin="normal"
            required={true}
            onChange={setFirstname}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            margin="normal"
            required={true}
            onChange={setLastname}
          />
        </Stack>
        <TextField
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          margin="normal"
          required={true}
          // value={email}
          onChange={setEmail}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          autoComplete="current-password"
          required={true}
          // value={password}
          onChange={setPassword}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Join this site's community. Read more"
          checked
        />
        <Button variant="contained">SIGN UP</Button>
      </FormGroup>
      <Stack direction="row" spacing={2}>
        <Button href="/login">Already have an account? Sign in</Button>
      </Stack>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 375px;
  margin: 0 auto;
`;
