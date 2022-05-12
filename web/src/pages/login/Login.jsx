import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

const Login = () => {
  const { setUser, setUserid } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(email);
        // REACT NATIVE: This line was for when I had email and password login
        // navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Container maxWidth="xs">
      Sign in
      <FormGroup>
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
        <FormControlLabel control={<Checkbox />} label="Remember me" />
        <Button variant="contained">SIGN IN</Button>
        <Button>Forgot password?</Button>
        <Button href="/signup">Don't have an account? Sign up</Button>
      </FormGroup>
    </Container>
  );
};

export default Login;
