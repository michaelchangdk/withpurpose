import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page Imports
import Homepage from "./public/Homepage";
import OpenLetter from "./public/OpenLetter";
import StartupSchool from "./public/StartupSchool";
import BlogList from "./public/BlogList";
import BlogPost from "./public/BlogPost";
import Team from "./public/Team";
import MentorsPublic from "./public/MentorsPublic";
import AlumniPublic from "./public/AlumniPublic";
import Contact from "./public/Contact";
import Login from "./login/Login";
import Signup from "./login/Signup";
import LandingPage from "./authenticated/LandingPage";
import WeekOverview from "./authenticated/WeekOverview";
import WeekPage from "./authenticated/WeekPage";
import ModulePage from "./authenticated/ModulePage";
import MasterClass from "./authenticated/MasterclassPage";
import MentorsPrivate from "./authenticated/MentorsPrivate";
import AlumniPrivate from "./authenticated/AlumniPrivate";
import ProfilePage from "./authenticated/ProfilePage";
import BookingPage from "./authenticated/BookingPage";
import RegistrationPage from "./public/RegistrationPage";
import NoAccess from "./login/NoAccess";
// MUI Theme Provider and Theme options Import
import { ThemeProvider } from "@mui/material/styles";
import { lightMode, darkMode } from "../styledcomponents/themeoptions";
import { Helmet } from "react-helmet";
const Router = () => {
  console.log(useSelector((store) => store.authenticated));

  // Checks if user is logged in, has access to pages, and if they have set darkmode as their theme
  const loggedin = useSelector((store) => store.authenticated.loggedin);
  const access = useSelector((store) => store.authenticated.access);
  const darkModeTrue = useSelector((store) => store.authenticated.darkMode);

  // List of approved weeks - how to implement week access using params? Perhaps better to implement using useEffect on week and module pages
  // const approvedWeekArr = Object.entries(access)
  //   .filter(([key, val]) => key.includes("Week") && val === true)
  //   .map((week) => week[0]);
  // console.log(approvedWeekArr);

  return (
    <ThemeProvider theme={darkModeTrue ? darkMode : lightMode}>
      <BrowserRouter>
        <Helmet>
          <title>
            With Purpose - Accelerating Women Entrepreneurs in the Nordics
          </title>
        </Helmet>
        <Routes>
          <Route path="/" element={loggedin ? <LandingPage /> : <Homepage />} />
          <Route path="/openletter" element={<OpenLetter />} />
          <Route path="/startup-school" element={<StartupSchool />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/team" element={<Team />} />
          <Route path="/mentors" element={<MentorsPublic />} />
          <Route path="/alumni" element={<AlumniPublic />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/startup-school-elearning"
            element={loggedin ? <LandingPage /> : <NoAccess />}
          />
          <Route
            path="/startup-school-weeks"
            element={
              loggedin && access.approvedSchool ? (
                <WeekOverview />
              ) : (
                <NoAccess />
              )
            }
          />
          <Route
            path="/week/:week"
            element={loggedin ? <WeekPage /> : <NoAccess />}
          />
          <Route
            path="/module/:module"
            element={loggedin ? <ModulePage /> : <NoAccess />}
          />
          <Route
            path="/masterclass"
            element={
              loggedin && access.approvedMasterClass ? (
                <MasterClass />
              ) : (
                <NoAccess />
              )
            }
          />
          <Route
            path="/book-a-mentor"
            element={
              loggedin && access.approvedMentorBooking ? (
                <MentorsPrivate />
              ) : (
                <NoAccess />
              )
            }
          />
          <Route
            path="/book-a-mentor/:mentorid"
            element={loggedin ? <BookingPage /> : <NoAccess />}
          />
          <Route
            path="/community"
            element={
              loggedin && access.approvedCommunity ? (
                <AlumniPrivate />
              ) : (
                <NoAccess />
              )
            }
          />
          <Route
            path="/profile/:user"
            element={loggedin ? <ProfilePage /> : <NoAccess />}
          />
          <Route path="*" element={<NoAccess />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;
