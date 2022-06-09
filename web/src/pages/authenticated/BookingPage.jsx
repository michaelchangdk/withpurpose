import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  TextField,
  Container,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import HeaderAuth from "../../components/authenticated/HeaderAuth";
import InputAdornment from "@mui/material/InputAdornment";
import EventIcon from "@mui/icons-material/Event";
import { client } from "../../client";
import { useParams } from "react-router-dom";

const BookingPage = () => {
  const [value, setValue] = useState(new Date());
  const [mentors, setMentors] = useState([]);
  const [mentor, setMentor] = useState([]);
  //   const id = useParams().mentorid;
  const [id, setId] = useState(useParams().mentorid);

  console.log(value, mentor);

  const disableDates = (date) => {
    // Disables weekends and dates before the 15th
    return date.getDay() === 0 || date.getDay() === 6 || date.getDate() < 15;
  };
  //   Fetch all mentors
  const mentorsQuery = `*[_type == "studentMentors"] {availability, bio, fullName, profilePhoto, topics, _id}`;
  useEffect(() => {
    client.fetch(mentorsQuery).then((response) => {
      console.log(response);
      setMentors(response);
    });
  }, [mentorsQuery]);

  //   Initial mentorQuery
  const mentorQuery = `*[_type == "studentMentors" && _id == "${id}"] {availability, bio, fullName, profilePhoto, topics, _id}`;
  useEffect(() => {
    client.fetch(mentorQuery).then((response) => {
      setMentor(response[0]);
    });
  }, [mentorQuery]);

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
      <Container maxWidth="xl">
        <HeaderAuth />
        <Typography>With Purpose Mentorship</Typography>
        <Typography>
          Check out our availability and book the date and time that works for
          you
        </Typography>
        <Divider />
        <Container maxWidth="sm">
          <Typography>{mentor.fullName}</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <MobileDatePicker
                label="Select date"
                inputFormat="dd/MM/yyyy"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                // Adding calendar icon to end of input field
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EventIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                disablePast={true}
                // Below disables dates past the EOY
                // maxDate={new Date(new Date().getFullYear(), 11, 31)}

                // Array that disables year and month picking from toolbar
                views={["day"]}
                shouldDisableDate={disableDates}
                // For hiding pen icon for switching to typing mode
                sx={{
                  "& .MuiPickersToolbar-penIconButton": { display: "none" },
                }}
              />
            </Stack>
          </LocalizationProvider>
          <FormControl fullWidth>
            <InputLabel>Select another mentor</InputLabel>
            <Select
              id="demo-simple-select"
              value={mentor._id}
              label="Mentor"
              onChange={(e) => setId(e.target.value)}
            >
              {mentors.map((mentor) => (
                <MenuItem key={mentor._id} value={mentor._id}>
                  {mentor.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Container>
      </Container>
    </Box>
  );
};

export default BookingPage;
