import { AuthProvider } from "./pages/AuthProvider";
import Routes from "./pages/Routes";

import React from "react";

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
