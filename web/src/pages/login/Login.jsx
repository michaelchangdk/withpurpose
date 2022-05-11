import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const { setUser, setUserid } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(email);
        // This line was for when I had email and password login
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
