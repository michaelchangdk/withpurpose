import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  TextField,
  Container,
  Typography,
  Button,
  //   Divider,
  //   FormControl,
  //   InputLabel,
  //   Select,
  //   MenuItem,
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
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(new Date());
  //   const [mentors, setMentors] = useState([]);
  const [mentor, setMentor] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableDateTimes, setAvailableDateTimes] = useState([]);
  const id = useParams().mentorid;
  const selectedWeekday = value.toString().substring(0, 3);
  const [weekdayAvailability, setWeekdayAvailability] = useState([]);
  //   const [id, setId] = useState(useParams().mentorid);

  const disableDates = (date) => {
    // // Example: Disables weekends and dates before the 15th
    //   return date.getDay() === 0 || date.getDay() === 6 || date.getDate() < 15;
    if (availableDays === null) {
      return (
        date.getDay() === 0 ||
        date.getDay() === 1 ||
        date.getDay() === 2 ||
        date.getDay() === 3 ||
        date.getDay() === 4 ||
        date.getDay() === 5 ||
        date.getDay() === 6
      );
    }
    const weekdayarray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const unavailabledays = weekdayarray.filter(
      (item) => !availableDays.includes(item)
    );
    const weekdaysNumbers = unavailabledays.map((day) => {
      if (day === "Sun") {
        return "date.getDay() === 0";
      } else if (day === "Mon") {
        return "date.getDay() === 1";
      } else if (day === "Tue") {
        return "date.getDay() === 2";
      } else if (day === "Wed") {
        return "date.getDay() === 3";
      } else if (day === "Thu") {
        return "date.getDay() === 4";
      } else if (day === "Fri") {
        return "date.getDay() === 5";
      } else if (day === "Sat") {
        return "date.getDay() === 6";
      }
      return "";
    });
    const disabledDays = weekdaysNumbers.join(" || ");
    // eslint-disable-next-line no-eval
    return eval(disabledDays);
  };

  useEffect(() => {
    setWeekdayAvailability(
      availableDateTimes.filter((day) => day.day === selectedWeekday)[0]
    );
  }, [availableDateTimes, selectedWeekday]);

  //   Selected date and array of available dates and times
  console.log(
    "datetimevalue:",
    value,
    "availabledatetimes:",
    availableDateTimes
  );

  //   Fetch all mentors
  //   const mentorsQuery = `*[_type == "studentMentors"] {availability, bio, fullName, profilePhoto, topics, _id}`;
  //   useEffect(() => {
  //     setLoading(true);
  //     client.fetch(mentorsQuery).then((response) => {
  //       console.log(response);
  //       setMentors(response);
  //       setLoading(false);
  //     });
  //   }, [mentorsQuery]);

  //   Fetch mentor by id
  const mentorQuery = `*[_type == "studentMentors" && _id == "${id}"] {availability, bio, fullName, profilePhoto, topics, _id}`;
  useEffect(() => {
    setLoading(true);
    client.fetch(mentorQuery).then((response) => {
      setMentor(response[0]);
      setAvailableDays(
        response[0].availability
          ? [...new Set(response[0].availability.map((day) => day.day))]
          : null
      );
      setAvailableDateTimes(
        response[0].availability ? response[0].availability : null
      );
      setLoading(false);
    });
  }, [mentorQuery]);

  console.log(weekdayAvailability);

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

        <Container maxWidth="sm">
          <Typography>
            With Purpose Mentorship Booking | {mentor.fullName}
          </Typography>
          <Typography>
            Check out their availability and book the date and time that works
            for you.
          </Typography>
          {/* <Typography>{mentor.fullName}</Typography> */}
          {!loading && (
            <>
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
              {weekdayAvailability &&
                weekdayAvailability.timeslots.map((timeslot) => (
                  <Button key={timeslot} variant="contained">
                    {timeslot}
                  </Button>
                ))}
            </>
          )}
          {/* {!loading && (
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
          )} */}
        </Container>
      </Container>
    </Box>
  );
};

export default BookingPage;
