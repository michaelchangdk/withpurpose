import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  TextField,
  Container,
  Typography,
  Button,
  ButtonGroup,
  Divider,
  Alert,
  AlertTitle,
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
import LoadingIndicator from "../../components/LoadingIndicator";
import format from "date-fns/format";
import { useSelector } from "react-redux";

const BookingPage = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(new Date());
  const [mentors, setMentors] = useState([]);
  const [mentor, setMentor] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableDateTimes, setAvailableDateTimes] = useState([]);
  // const id = useParams().mentorid;
  const selectedWeekday = value ? value.toString().substring(0, 3) : null;
  const [weekdayAvailability, setWeekdayAvailability] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [alert, setAlert] = useState("");
  const [id, setId] = useState(useParams().mentorid);
  const [error, setError] = useState("");
  const userid = useSelector((store) => store.authenticated.uid);

  const disableDates = (date) => {
    // // Example: Disables weekends and dates before the 15th
    //   return date.getDay() === 0 || date.getDay() === 6 || date.getDate() < 15;
    if (availableDays === null) {
      setError("No available dates.");
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
      availableDateTimes
        ? availableDateTimes.filter((day) => day.day === selectedWeekday)[0]
        : null
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
  const mentorsQuery = `*[_type == "studentMentors"] {availability, bio, fullName, profilePhoto, topics, _id}`;
  useEffect(() => {
    setLoading(true);
    client.fetch(mentorsQuery).then((response) => {
      console.log(response);
      setMentors(response);
      setLoading(false);
    });
  }, [mentorsQuery]);

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

  const setNewMentor = (e) => {
    setMentor(mentors.filter((mentor) => mentor._id === e.target.value)[0]);
    setId(e.target.value);
  };

  console.log(mentor, availableDays, availableDateTimes);

  const confirmBooking = () => {
    client
      .patch(mentor._id)
      .set({
        availability: [
          { day: selectedWeekday },
          {
            bookingrequest: [
              {
                student: userid,
                datetime: `${selectedTime} on ${format(value, "d MMMM yyyy")}`,
              },
            ],
          },
        ],
      })
      // .insert("after", "bookingrequest[-1]", [
      //   {
      //     student: userid,
      //     datetime: `${selectedTime} on ${format(value, "d MMMM yyyy")}`,
      //   },
      // ])
      .commit({ autoGenerateArrayKeys: true })
      .then((res) => {
        console.log(res);
        setAlert("Booking request sent!");
      });
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
      <Container maxWidth="xl">
        <HeaderAuth />
        {loading && <LoadingIndicator />}
        <Container maxWidth="sm">
          <Typography>With Purpose Mentorship Booking</Typography>
          <Typography>
            Please note that you are only requesting a meeting in the mentors'
            available time slots. If your request is accepted, you will receive
            a follow-up email with a video conferencing link.
          </Typography>
          <Typography>
            By default, we go with the first-come, first-served principle but to
            ensure that everyone in the cohort receives an equal chance for a
            personal mentorship session, we will also consider if you have
            previously received a mentor session or if you have requested
            multiple mentor sessions.
          </Typography>
          <Typography>
            We will try our best to ensure everyone is happy and receives one
            mentorship session at minimum.
          </Typography>
          <Typography>
            Check out their availability and book the date and time that works
            for you.
          </Typography>
          {/* <Typography>{mentor.fullName}</Typography> */}
          {!loading && (
            <FormControl fullWidth>
              <InputLabel>Select a mentor</InputLabel>
              <Select
                id="demo-simple-select"
                value={mentor._id}
                label="Mentor"
                onChange={setNewMentor}
              >
                {mentors.map((mentor) => (
                  <MenuItem key={mentor._id} value={mentor._id}>
                    {mentor.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
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
              <Typography>
                {value ? format(value, "EEEE, d MMMM yyyy") : ""}
              </Typography>
              {/* SOME ERROR BELOW WITH MAPPING OF TIMESLOTS */}
              <ButtonGroup orientation="vertical">
                {weekdayAvailability &&
                  weekdayAvailability.timeslots.map((timeslot) => (
                    <Button
                      key={timeslot}
                      size="large"
                      onClick={(e) => setSelectedTime(e.target.value)}
                      value={timeslot}
                    >
                      {timeslot}
                    </Button>
                  ))}
              </ButtonGroup>
            </>
          )}
          <Typography>Booking Summary</Typography>
          <Divider />
          <Typography>With Purpose Mentorship</Typography>
          {selectedTime && (
            <>
              <Typography>
                {value
                  ? `${format(value, "d MMMM yyyy")}, ${selectedTime}`
                  : ""}
              </Typography>
              <Typography>{mentor.fullName.toUpperCase()}</Typography>
              <Typography>30 min</Typography>
              <Button onClick={confirmBooking}>Confirm booking request</Button>
            </>
          )}
          {alert.length > 0 && (
            <Alert severity="success">
              <AlertTitle>{alert}</AlertTitle>Remember to keep an eye on your
              e-mail for a follow-up confirmation with a video conferencing
              link.
              {/* You can also find your
                booking request on your profile page. */}
            </Alert>
          )}
          {error.length > 0 && (
            <Alert severity="warning">
              <AlertTitle>{Error}</AlertTitle>Unfortunately there are no
              available dates.
              {/* You can also find your
                booking request on your profile page. */}
            </Alert>
          )}
        </Container>
      </Container>
    </Box>
  );
};

export default BookingPage;
