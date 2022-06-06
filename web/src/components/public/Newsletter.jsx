import React, { useState } from "react";
import {
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Newsletter = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  console.log(firstname, lastname, email);

  //   const emailPattern =
  //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return (
    <NewsletterWrapper>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="center" gap={2}>
          <IconButton
            onClick={() =>
              window.open("https://www.instagram.com/withpurposeorg/", "_blank")
            }
          >
            <InstagramIcon
              color="secondary"
              sx={{ width: "60px", height: "60px" }}
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
            <LinkedInIcon color="info" sx={{ width: "60px", height: "60px" }} />
          </IconButton>
        </Stack>
        <Typography variant="h4" textAlign="center">
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
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ fontSize: "18px", fontWeight: "700" }}
        >
          Submit
        </Button>
      </Stack>
    </NewsletterWrapper>
  );
};

export default Newsletter;

const NewsletterWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  @media (min-width: 768px) {
    width: 50%;
  }
`;
