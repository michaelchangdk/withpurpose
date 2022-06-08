import React, { useState } from "react";
import PublicHeader from "../../components/public/PublicHeader";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  Alert,
  AlertTitle,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import PageFooter from "../../components/public/PageFooter";
import styled from "styled-components";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [startup, setStartup] = useState(false);
  const [entrepreneur, setEntrepreneur] = useState(false);
  const [mentor, setMentor] = useState(false);
  const [volunteer, setVolunteer] = useState(false);
  const [investor, setInvestor] = useState(false);
  const [corporatepartner, setCorporatepartner] = useState(false);
  const [other, setOther] = useState(false);
  const [startupname, setStartupname] = useState("");
  const [message, setMessage] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState("");

  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const submitForm = () => {
    if (!email.match(emailPattern)) {
      setAlert("Please enter a valid email address.");
    } else if (firstname.length < 2 || lastname.length < 2) {
      setAlert("Please enter a valid name.");
    } else if (message.length < 10) {
      setAlert("Please enter a message.");
    } else {
      setSuccess("Your message has been sent. Thank you!");
      setAlert("");
      console.log(
        "firstname",
        firstname,
        "lastname",
        lastname,
        "email",
        email,
        "startup",
        startup,
        "entrepreneur",
        entrepreneur,
        "mentor",
        mentor,
        "volunteer",
        volunteer,
        "investor",
        investor,
        "corporatepartner",
        corporatepartner,
        "other",
        other,
        "startupname",
        startupname,
        "message",
        message,
        "newsletter",
        newsletter
      );
    }
  };

  return (
    <ThemeProvider theme={darkMode}>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          width: "100%",
          minHeight: "100vh",
          height: "100%",
        }}
      >
        <PublicHeader />
        <Container maxWidth="xl">
          <Typography variant="h3" textAlign="center">
            Contact us
          </Typography>
          <GridContainer>
            <TextContainer>
              <Stack gap={2}>
                <Typography>
                  Ready to make an impact? Contact us to learn how we can start
                  working together.
                </Typography>
                <Typography>
                  By joining With Purpose you become a crucial part of our
                  movement by making sure that our mission is heard and has a
                  far-reaching, lasting impact.
                </Typography>
                <Typography>
                  We work closely with both men and women to close the gender
                  gap in entrepreneurship. We believe that real impact can be
                  made only if we work together.
                </Typography>
                <Typography>
                  We’re looking for experienced founders and investors to offer
                  coaching and guidance to rising stars.
                </Typography>
                <Typography>
                  Contact us if you want to know more about us, if you have a
                  question, or if you want to join us in any capacity.
                </Typography>
                <Typography>
                  You can also always contact us by email by{" "}
                  <StyledLink href="mailto:hello@wpurpose.org">
                    clicking this link.
                  </StyledLink>
                </Typography>
              </Stack>
            </TextContainer>
            <ContactForm>
              <Stack gap={1}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  required={true}
                  autoComplete="First name"
                  fullWidth
                  color="primary"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  required={true}
                  autoComplete="Last name"
                  fullWidth
                  color="primary"
                  onChange={(e) => setLastname(e.target.value)}
                />
                <TextField
                  label="Email Address"
                  variant="outlined"
                  required={true}
                  autoComplete="Email"
                  fullWidth
                  color="primary"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Typography>I'm interested to join as *</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => setStartup(e.target.checked)}
                      />
                    }
                    label="An existing founder with my startup"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => setEntrepreneur(e.target.checked)}
                      />
                    }
                    label="An entrepreneur (don't have a startup yet)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={(e) => setMentor(e.target.checked)} />
                    }
                    label="A mentor"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => setVolunteer(e.target.checked)}
                      />
                    }
                    label="A volunteer to help the initiative"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => setInvestor(e.target.checked)}
                      />
                    }
                    label="An investor"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => setCorporatepartner(e.target.checked)}
                      />
                    }
                    label="A potential corporate partner"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox onChange={(e) => setOther(e.target.checked)} />
                    }
                    label="Other"
                  />
                </FormGroup>
                {startup && (
                  <TextField
                    label="Name of your awesome startup"
                    variant="outlined"
                    required={true}
                    fullWidth
                    color="primary"
                    onChange={(e) => setStartupname(e.target.value)}
                  />
                )}
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  rows={4}
                  defaultValue="Type your message here..."
                  onChange={(e) => setMessage(e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      onChange={(e) => setNewsletter(e.target.checked)}
                    />
                  }
                  label="I'd love to receive updates from time to time (but can opt-out at any time)"
                />
                {alert.length > 0 && (
                  <Alert severity="warning">
                    <AlertTitle>Alert</AlertTitle>
                    {alert}
                  </Alert>
                )}
                {success.length > 0 && (
                  <Alert severity="success">{success}</Alert>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    fontSize: "18px",
                    fontWeight: "700",
                    width: "220px",
                    margin: "0 auto",
                  }}
                  onClick={submitForm}
                >
                  Submit
                </Button>
              </Stack>
            </ContactForm>
          </GridContainer>
        </Container>
        <PageFooter />
      </Box>
    </ThemeProvider>
  );
};

export default Contact;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  gap: 3vh;
  margin-top: 3vh;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 3vh;
  }

  @media (min-width: 1100px) {
    gap: 6vh;
  }
`;

const TextContainer = styled.div`
  max-width: 500px;
  justify-self: center;

  @media (min-width: 768px) {
    justify-self: flex-end;
  }
`;

const ContactForm = styled.div`
  max-width: 500px;
  justify-self: center;

  @media (min-width: 768px) {
    justify-self: flex-start;
  }
`;

const StyledLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
  color: white;
`;
