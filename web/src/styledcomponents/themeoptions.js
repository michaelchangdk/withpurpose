import { createTheme } from "@mui/material/styles";

export const lightMode = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6356D7",
      contrastText: "white",
    },
    secondary: {
      main: "#E93A7D",
      contrastText: "white",
    },
    success: {
      main: "#64C800",
      contrastText: "white",
    },
    info: {
      main: "#5491e3",
    },
  },
});

export const darkMode = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6356D7",
    },
    secondary: {
      main: "#E93A7D",
    },
    success: {
      main: "#64C800",
    },
    info: {
      main: "#5491e3",
    },
  },
});
