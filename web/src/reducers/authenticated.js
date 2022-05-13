import { createSlice } from "@reduxjs/toolkit";

export const authenticated = createSlice({
  name: "authenticated",
  initialState: {
    loggedin: false,
    uid: "",
    displayName: "",
  },

  reducers: {
    login: (state, action) => {
      state.loggedin = true;
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
    },
    logout: (state, action) => {
      state.loggedin = false;
      state.uid = "";
      state.displayName = "";
    },
  },
});
