import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./public/Homepage";

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Homepage} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
