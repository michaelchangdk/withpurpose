// INSTEAD OF USECONTEXT, LET'S USE REDUX + REACT ROUTER
// LOCAL STORAGE FOR SAVING LOGGED IN?

import React from "react";
import { AuthProvider } from "./pages/AuthProvider";
import Routes from "./pages/Routes";
// import Router from "./pages/Router";

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
