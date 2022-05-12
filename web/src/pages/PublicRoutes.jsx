import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
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
import MasterClass from "./authenticated/MasterclassPage";
import MentorsPrivate from "./authenticated/MentorsPrivate";
import AlumniPrivate from "./authenticated/AlumniPrivate";
import ProfilePage from "./authenticated/ProfilePage";

const PublicRoutes = () => {
  // Use Redux for user instead of usecontext, usecontext disappears on reload
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <LandingPage /> : <Homepage />} />
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
        <Route path="/startup-school-2-0" element={<WeekOverview />} />
        <Route path="/week/:week" element={<WeekPage />} />
        <Route path="/masterclass" element={<MasterClass />} />
        <Route path="/book-a-mentor" element={<MentorsPrivate />} />
        <Route path="/community" element={<AlumniPrivate />} />
        <Route path="/profile/:user" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
