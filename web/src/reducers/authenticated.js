import { createSlice } from "@reduxjs/toolkit";

export const authenticated = createSlice({
  name: "authenticated",
  initialState: {
    loggedin: false,
    uid: "",
    displayName: "",
    completedLessons: [],
    photoURL: "",
    access: {
      approvedMasterClass: "",
      approvedMentorBooking: "",
      approvedCommunity: "",
      approvedSchool: "",
      approvedWeek0: "",
      approvedWeek1: "",
      approvedWeek23: "",
      approvedWeek4: "",
      approvedWeek5: "",
      approvedWeek6: "",
    },
    darkMode: false,
  },

  reducers: {
    login: (state, action) => {
      state.loggedin = true;
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.access.approvedSchool = action.payload.approvedSchool;
      state.access.approvedWeek0 = action.payload.approvedWeek0;
      state.access.approvedWeek1 = action.payload.approvedWeek1;
      state.access.approvedWeek23 = action.payload.approvedWeek23;
      state.access.approvedWeek4 = action.payload.approvedWeek4;
      state.access.approvedWeek5 = action.payload.approvedWeek5;
      state.access.approvedWeek6 = action.payload.approvedWeek6;
      state.access.approvedMasterClass = action.payload.approvedMasterClass;
      state.access.approvedMentorBooking = action.payload.approvedMentorBooking;
      state.access.approvedCommunity = action.payload.approvedCommunity;
      state.darkMode = action.payload.darkMode;
      state.photoURL = action.payload.photoURL;
    },
    logout: (state, action) => {
      state.loggedin = false;
      state.uid = "";
      state.displayName = "";
      state.completedLessons = [];
      state.access.approvedSchool = "";
      state.access.approvedWeek0 = "";
      state.access.approvedWeek1 = "";
      state.access.approvedWeek23 = "";
      state.access.approvedWeek4 = "";
      state.access.approvedWeek5 = "";
      state.access.approvedWeek6 = "";
      state.access.approvedMasterClass = "";
      state.access.approvedMentorBooking = "";
      state.access.approvedCommunity = "";
      state.darkMode = false;
      state.photoURL = "";
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
      state.completedLessons = state.completedLessons.filter(
        (lesson) => lesson._key !== action.payload[0]._key
      );
    },
    toggleDarkMode: (state, action) => {
      state.darkMode = !state.darkMode;
    },
    changeDisplayname: (state, action) => {
      state.displayName = action.payload;
    },
    updateAccess: (state, action) => {
      state.access.approvedSchool = action.payload.approvedSchool;
      state.access.approvedWeek0 = action.payload.approvedWeek0;
      state.access.approvedWeek1 = action.payload.approvedWeek1;
      state.access.approvedWeek23 = action.payload.approvedWeek23;
      state.access.approvedWeek4 = action.payload.approvedWeek4;
      state.access.approvedWeek5 = action.payload.approvedWeek5;
      state.access.approvedWeek6 = action.payload.approvedWeek6;
      state.access.approvedMasterClass = action.payload.approvedMasterClass;
      state.access.approvedMentorBooking = action.payload.approvedMentorBooking;
      state.access.approvedCommunity = action.payload.approvedCommunity;
    },
  },
});
