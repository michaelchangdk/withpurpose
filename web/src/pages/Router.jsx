import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NoAccess from "./login/NoAccess";
import { ThemeProvider } from "@mui/material/styles";
import { lightMode, darkMode } from "../styledcomponents/themeoptions";
import BookingPage from "./authenticated/BookingPage";

const Router = () => {
  const loggedin = useSelector((store) => store.authenticated.loggedin);
  console.log(useSelector((store) => store.authenticated));
  const access = useSelector((store) => store.authenticated.access);
  const darkModeTrue = useSelector((store) => store.authenticated.darkMode);

  // List of approved weeks - not sure how to implement week access using param
  // const approvedWeekArr = Object.entries(access)
  //   .filter(([key, val]) => key.includes("Week") && val === true)
  //   .map((week) => week[0]);
  // console.log(approvedWeekArr);

  return (
    <ThemeProvider theme={darkModeTrue ? darkMode : lightMode}>
      <BrowserRouter>
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
          {/* NEED USER below */}
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
          {/* HOW TO NAVIGATE BETWEEN WEEK/WEEK? & MODULES */}
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
