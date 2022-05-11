import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const { setUser, setUserid } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return <>Signup page</>;
};

export default Signup;
