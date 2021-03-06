import { createTheme } from "@mui/material/styles";

export const lightMode = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f6f4f4",
    },
    primary: {
      main: "#6356D7",
      contrastText: "white",
    },
    secondary: {
      main: "#E93A7D",
      contrastText: "white",
    },
    black: {
      main: "000",
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
  typography: {
    h1: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 800,
      lineHeight: 0.9,
    },
    h2: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 600,
      lineHeight: 1,
    },
    h3: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 500,
    },
    h4: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 400,
    },
    h5: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 300,
    },
    h6: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "6rem",
      fontWeight: 700,
      lineHeight1: 1.167,
      letterSpacing: "-0.01562em",
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
    black: {
      main: "000",
      contrastText: "white",
    },
    success: {
      main: "#64C800",
    },
    info: {
      main: "#5491e3",
    },
  },
  typography: {
    h1: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 800,
      lineHeight: 1,
    },
    h2: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 700,
      lineHeight: 1,
    },
    h3: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 500,
    },
    h4: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 400,
    },
    h5: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 300,
    },
    h6: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "6rem",
      fontWeight: 700,
      lineHeight1: 1.167,
      letterSpacing: "-0.01562em",
    },
  },
});
