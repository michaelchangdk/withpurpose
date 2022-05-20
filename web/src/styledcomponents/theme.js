import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    pink: {
      main: "#E93A7D",
      contrastText: "#fff",
    },
    green: {
      main: "#64C800",
      contrastText: "#fff",
    },
    purple: {
      main: "#6356D7",
      contrastText: "#fff",
    },
    // Lightpurple contrastText doesn't work - I think MaterialUI picks up
    // on contrast and won't allow it because the contrast is too low for accessibility
    lightpurple: {
      main: "#A39EDF",
      contrastText: "fff",
    },
  },
});
