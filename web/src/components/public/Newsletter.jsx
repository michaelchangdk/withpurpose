import React, { useState } from "react";

// MUI Imports
import {
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
  Container,
  Alert,
  AlertTitle,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Newsletter = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailPattern =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = () => {
    if (firstname.length < 2 || lastname.length < 2) {
      setError("Please fill out your name.");
    } else if (!email.match(emailPattern)) {
      setError("Please enter a valid email address.");
    } else {
      setSuccess("Thank you for subscribing!");
      setError("");
      pushToMake();
    }
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      email: email,
    }),
  };

  const pushToMake = () => {
    fetch(
      "https://hook.eu1.make.com/wsf42sgicwtrhmc526tnxux5vku7g5js",
      options
    ).then((res) => {
      console.log(res);
      setSuccess("Thank you for subscribing!");
    });
  };

  return (
    <Container maxWidth="xs" sx={{ margin: "0 auto" }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="center" gap={2}>
          <IconButton
            onClick={() =>
              window.open("https://www.instagram.com/withpurposeorg/", "_blank")
            }
          >
            <InstagramIcon
              color="secondary"
              sx={{ width: "50px", height: "50px" }}
            />
          </IconButton>
          <IconButton
            onClick={() =>
              window.open(
                "https://www.linkedin.com/company/builtwithpurpose",
                "_blank"
              )
            }
          >
            <LinkedInIcon color="info" sx={{ width: "50px", height: "50px" }} />
          </IconButton>
        </Stack>
        <Typography variant="h4" fontSize={28} textAlign="center">
          With Purpose Newsletter
        </Typography>
        <Typography textAlign="center">
          Come say hello, we will be sharing exciting news about how our
          community is developing.
        </Typography>
        <TextField
          label="First Name"
          variant="outlined"
          required={true}
          autoComplete="First name"
          fullWidth
          color="secondary"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          required={true}
          autoComplete="Last name"
          fullWidth
          color="secondary"
          onChange={(e) => setLastname(e.target.value)}
        />
        <TextField
          label="Email Address"
          variant="outlined"
          required={true}
          autoComplete="Email"
          fullWidth
          color="secondary"
          onChange={(e) => setEmail(e.target.value)}
        />
        {success.length > 0 && <Alert severity="success">{success}</Alert>}
        {error.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ fontSize: "18px", fontWeight: "700" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default Newsletter;
