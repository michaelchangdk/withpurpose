import { createSlice } from "@reduxjs/toolkit";

export const authenticated = createSlice({
  name: "authenticated",
  initialState: {
    loggedin: false,
  },

  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.loggedin = true;
    },
    logout: (state, action) => {
      console.log(action.payload);
      state.loggedin = false;
    },
  },
});
