import React, { useState } from "react";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import { useDispatch, useSelector } from "react-redux";
import { authenticated } from "../../reducers/authenticated";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { client } from "../../client";
import { Box } from "@mui/material";

const ProfilePage = () => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const userid = useSelector((store) => store.authenticated.uid);
  const darkMode = useSelector((store) => store.authenticated.darkMode);

  const userAvatarUrl = useSelector((store) => store.authenticated.photoURL);
  const displayName = useSelector((store) => store.authenticated.displayName);

  const toggleDarkMode = () => {
    if (checked) {
      setChecked(false);
      dispatch(authenticated.actions.toggleDarkMode(false));
      client.patch(userid).set({ darkMode: false }).commit();
    } else if (!checked) {
      setChecked(true);
      dispatch(authenticated.actions.toggleDarkMode(true));
      client.patch(userid).set({ darkMode: true }).commit();
    }
  };

  const stringAvatar = () => {
    return {
      children: `${displayName.split(" ")[0][0]}${
        displayName.split(" ")[1][0]
      }`,
    };
  };


  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        width: "100%",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      {/* remove avatar from header and have it larger size and centered */}
      <HeaderAuth />
      {/* Profile Page */}
      <Container maxWidth="xs">
        <Stack spacing={2} mt={12}>
          {userAvatarUrl.length > 0 && (
            <Avatar
              src={userAvatarUrl}
              alt={displayName}
              sx={{ height: 100, width: 100 }}
            />
          )}
          {userAvatarUrl.length === 0 && (
            <Avatar
              {...stringAvatar({ displayName })}
              alt={displayName}
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                height: 100,
                width: 100,
              }}
            />
          )}
          <Typography>
            {displayName}
          </Typography>
          <Button>
            Change display name
          </Button>
          <Accordion>
            <AccordionSummary>
              <Typography>
                Change email
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
              label="Current email address"
              variant="outlined"
              fullWidth
              required={true}
              // onChange={(e) => setEmail(e.target.value)}
              // autoComplete="Email"
              >
                
              </TextField>
              <TextField
              label="New email address"
              variant="outlined"
              fullWidth
              required={true}
              // onChange={(e) => setEmail(e.target.value)}
              // autoComplete="Email"
              >
              
              </TextField>
              <TextField
              label="Confirm new email"
              variant="outlined"
              fullWidth
              required={true}
              // onChange={(e) => setEmail(e.target.value)}
              // autoComplete="Email"
              >
              
              </TextField>
              <Button>
                Change email
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <Typography>
                Reset password
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              
              <Button>
                Click to recieve email to reset password
              </Button>
              {/* Some sort of alarm to confirm that email has been sent */}
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Container>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label="Dark Mode?"
        />
      </FormGroup>
      {/* Button to log out ?*/}
    </Box>
  );
};

export default ProfilePage;
