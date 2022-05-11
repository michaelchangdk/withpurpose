import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./authenticated/LandingPage";
import WeekOverview from "./authenticated/WeekOverview";
import WeekPage from "./authenticated/WeekPage";
import MasterClass from "./authenticated/MasterclassPage";
import MentorsPrivate from "./authenticated/MentorsPrivate";
import AlumniPrivate from "./authenticated/AlumniPrivate";
import ProfilePage from "./authenticated/ProfilePage";

const AuthenticatedRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/startup-school-elearning" element={<LandingPage />} />
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

export default AuthenticatedRoutes;
