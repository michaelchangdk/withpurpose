import React, { useState, useEffect } from "react";
import { client } from "../../client";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import format from "date-fns/format";

// MUI Imports
import {
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
// MUI Imports for booking
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import AlarmIcon from "@mui/icons-material/Alarm";
import InputAdornment from "@mui/material/InputAdornment";
import EventIcon from "@mui/icons-material/Event";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// Component Imports
import HeroHeader from "../../components/authenticated/HeroHeader";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import styled from "styled-components/macro";
import {
  BackgroundBox,
  DescriptionContainer,
  DescriptionChild,
  DescriptionTypography,
} from "../../styledcomponents/containers";
// Function Imports

const BookingPage = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(new Date());
  const [mentors, setMentors] = useState([]);
  const [mentor, setMentor] = useState([]);

  const [availableDays, setAvailableDays] = useState([]);

  const [availableDateTimes, setAvailableDateTimes] = useState([]);
  const selectedWeekday = value ? value.toString().substring(0, 3) : null;
  const [weekdayAvailability, setWeekdayAvailability] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [alert, setAlert] = useState("");
  const [id, setId] = useState(useParams().mentorid);
  const [error, setError] = useState("");
  const userid = useSelector((store) => store.authenticated.uid);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Fetch page
  useEffect(() => {
    client
      .fetch(`*[_type == "booking"] {description}`)
      .then((res) => setDescription(res[0].description));
  }, []);

  // Function for disabling dates
  const disableDates = (date) => {
    // Example: Disables weekends and dates before the 15th
    // return date.getDay() === 0 || date.getDay() === 6 || date.getDate() < 15;
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
    const weekdayarray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  // useEffect for setting weekday availability when selecting new mentors
  useEffect(() => {
    setWeekdayAvailability(
      availableDateTimes
        ? availableDateTimes.filter((day) => day.day === selectedWeekday)[0]
        : null
    );
  }, [availableDateTimes, selectedWeekday]);

  // Fetch all mentors for dropdown selection
  const mentorsQuery = `*[_type == "mentors" && !(_id in path('drafts.**'))] {studentmentors[]->{availability, fullName, _id, bookingrequest}}`;
  useEffect(() => {
    setLoading(true);
    client.fetch(mentorsQuery).then((response) => {
      setMentors(response[0].studentmentors);
      setLoading(false);
    });
  }, [mentorsQuery]);

  // Fetch mentor by id for individual booking
  const mentorQuery = `*[_type == "studentMentors" && _id == "${id}" && !(_id in path('drafts.**'))] {availability, fullName, _id}`;
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

  // Selecting a new mentor and resetting any errors
  const setNewMentor = (e) => {
    setMentor(mentors.filter((mentor) => mentor._id === e.target.value)[0]);
    setId(e.target.value);
    setError("");
    setAlert("");
  };

  // Formula for confirming a booking and patching to Sanity
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
          mentor: mentor.fullName,
          datetime: `${selectedTime} on ${format(value, "d MMMM yyyy")}`,
        },
      ])
      .commit({ autoGenerateArrayKeys: true })
      .then(() => {
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
      <HeroHeader
        query={`*[_type == "booking" && !(_id in path('drafts.**'))] {heroImage, title, subtitle, _id}`}
        type={"page"}
      />
      {!loading && description && (
        <DescriptionContainer backgroundcolor="#6356d7">
          <DescriptionChild>
            <DescriptionTypography>{description}</DescriptionTypography>
          </DescriptionChild>
        </DescriptionContainer>
      )}
      <Container maxWidth="lg">
        <div style={{ maxWidth: "1032px", margin: "0 auto" }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate("/book-a-mentor")}
            sx={{ margin: "32px 0" }}
          >
            Back
          </Button>
        </div>
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
                      conferencing link. You can also find your booking request
                      on your profile page.
                    </Alert>
                  )}
                  <Button
                    size="large"
                    variant="contained"
                    onClick={confirmBooking}
                  >
                    Confirm booking request
                  </Button>
                </>
              )}
            </GridChild>
          )}
        </PageGrid>
      </Container>
      <PageFooter />
      <ScrollToTop />
    </BackgroundBox>
  );
};

export default BookingPage;

const PageGrid = styled.div`
  display: grid;
  gap: 32px;
  margin: 0 auto;
  justify-content: center;
  padding-top: 32px;
  grid-template-columns: 1fr;
  justify-items: center;
  max-width: 1032px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const GridChild = styled.div`
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
