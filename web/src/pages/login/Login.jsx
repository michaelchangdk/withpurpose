import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../firebase";

const Login = () => {
  const { setUser, setUserid } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <>
      Login Page. Don't have a user? Sign up <Link to="/signup">here!</Link>
    </>
  );
};

export default Login;
