import { createSlice } from "@reduxjs/toolkit";

export const authenticated = createSlice({
  name: "authenticated",
  initialState: {
    loggedin: false,
    uid: "",
    displayName: "",
    completedLessons: [],
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
      state.completedLessons = [];
    },
    addCompletedLesson: (state, action) => {
      if (
        !state.completedLessons.some(
          (lesson) => lesson._key === action.payload._key
        )
      ) {
        state.completedLessons.push(action.payload);
      }
    },
    removeCompletedLesson: (state, action) => {
      console.log("remove complete to reducer", action.payload);
    },
  },
});
