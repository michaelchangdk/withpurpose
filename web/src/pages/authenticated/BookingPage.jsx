import React, { useState, useEffect } from "react";
import {
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
import AlarmIcon from "@mui/icons-material/Alarm";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import EventIcon from "@mui/icons-material/Event";
import { client } from "../../client";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator";
import format from "date-fns/format";
import { useSelector } from "react-redux";
import LandingPageHero from "../../components/authenticated/LandingPageHero";
import styled from "styled-components";
import { BackgroundBox } from "../../styledcomponents/globalstyles";

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
  const [description, setDescription] = useState("");

  // Fetch page
  useEffect(() => {
    client
      .fetch(`*[_type == "booking"] {description}`)
      .then((res) => setDescription(res[0].description));
  }, []);

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

  //   Fetch all mentors
  const mentorsQuery = `*[_type == "studentMentors"] {availability, bio, fullName, profilePhoto, topics, _id, bookingrequest}`;
  useEffect(() => {
    setLoading(true);
    client.fetch(mentorsQuery).then((response) => {
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
    setError("");
    setAlert("");
  };

  const confirmBooking = () => {
    client
      .patch(mentor._id)
      .setIfMissing({
        bookingrequest: [],
      })
      .insert("after", "bookingrequest[-1]", [
        {
          student: {
            _type: "reference",
            _ref: userid,
          },
          datetime: `${selectedTime} on ${format(value, "d MMMM yyyy")}`,
        },
      ])
      .commit({ autoGenerateArrayKeys: true })
      .then((res) => {
        console.log(res);
        setAlert("Booking request sent!");
      });
  };

  return (
    <BackgroundBox
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        width: "100%",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <LandingPageHero
        query={`*[_type == "booking"] {heroImage, title, subtitle}`}
        type={"page"}
      />
      {!loading && description && (
        <DescriptionContainer>
          <DescriptionChild>
            <StyledTypo>{description}</StyledTypo>
          </DescriptionChild>
        </DescriptionContainer>
      )}
      <Container maxWidth="lg">
        {loading && <LoadingIndicator />}
        <PageGrid>
          <GridChild>
            {!loading && (
              <FormControl fullWidth>
                <InputLabel>Select a mentor</InputLabel>
                <Select value={id} label="Mentor" onChange={setNewMentor}>
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
                        "& .MuiPickersToolbar-penIconButton": {
                          display: "none",
                        },
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
                        startIcon={<AlarmIcon />}
                      >
                        {timeslot}
                      </Button>
                    ))}
                </ButtonGroup>
                {error.length > 0 && (
                  <Alert severity="warning">
                    <AlertTitle>{error}</AlertTitle>Unfortunately there are no
                    available time slots for the selected mentor.
                  </Alert>
                )}
              </>
            )}
          </GridChild>
          {selectedTime.length > 0 && (
            <GridChild>
              <div>
                <Typography variant="h5" fontWeight={400}>
                  Booking Summary
                </Typography>
                <Typography variant="subtitle">
                  With Purpose Mentorship
                </Typography>
                <Divider />
              </div>
              {selectedTime && (
                <>
                  <div>
                    <Typography fontWeight={500}>
                      {value
                        ? `${format(value, "d MMMM yyyy")}, ${selectedTime}`
                        : ""}
                    </Typography>
                    <Typography>{mentor.fullName.toUpperCase()}</Typography>
                    <Typography>30 min</Typography>
                  </div>
                  {alert.length > 0 && (
                    <Alert severity="success">
                      <AlertTitle>{alert}</AlertTitle>Remember to keep an eye on
                      your e-mail for a follow-up confirmation with a video
                      conferencing link.
                      {/* You can also find your
                booking request on your profile page. */}
                    </Alert>
                  )}
                  <Button variant="contained" onClick={confirmBooking}>
                    Confirm booking request
                  </Button>
                </>
              )}
            </GridChild>
          )}
        </PageGrid>
      </Container>
    </BackgroundBox>
  );
};

export default BookingPage;

const DescriptionContainer = styled.div`
  /* background-color: #e93a7d; */
  background-color: #6356d7;
  /* background-color: #5491e3; */
  color: white;
  padding: 48px 0;
  white-space: pre-line;
  vertical-align: bottom;

  @media (min-width: 768px) {
    padding: 48px 0;
  }
`;

const DescriptionChild = styled(Container)`
  && {
    padding: 0 84px;
  }
`;

const StyledTypo = styled(Typography)`
  /* && {
  } */

  @media (min-width: 768px) {
    && {
      font-size: 18px;
      line-height: 1.6;
    }
  }
`;

const PageGrid = styled.div`
  display: grid;
  gap: 32px;
  margin: 0 auto;
  justify-content: center;
  padding-top: 32px;
  padding-bottom: 40px;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const GridChild = styled.div`
  max-width: 500px;
  width: 100%;
  justify-self: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
