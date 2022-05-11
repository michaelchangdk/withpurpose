import React from "react";
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

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
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
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
