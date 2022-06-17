import { useState, useEffect } from "react";
import { client } from "../client";

// HeroHeader Component - fetching Hero Header
export const SetHeader = (query) => {
  const [loading, setLoading] = useState(true);
  const [heroRef, setHeroRef] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    client.fetch(query).then((response) => {
      setHeroRef(response[0].heroImage.asset._ref);
      setTitle(response[0].title);
      setSubtitle(response[0].subtitle);
      setLoading(false);
    });
  }, [query]);

  return [loading, heroRef, title, subtitle];
};

// LessonItem Component Functions
export const checkLesson = (userid, lesson) => {
  client
    .patch(userid)
    .setIfMissing({
      completed: [],
    })
    .insert("after", "completed[-1]", [
      {
        lessonRef: lesson._id,
        lessonTitle: lesson.title,
        userId: userid,
        completed: true,
      },
    ])
    .commit({ autoGenerateArrayKeys: true })
    .then(() => {});
};

export const uncheckLesson = (userid, completedLesson) => {
  const deleteQuery = [
    `completed[lessonRef=="${completedLesson[0].lessonRef}"]`,
  ];
  client
    .patch(userid)
    .unset(deleteQuery)
    .commit()
    .then(() => {});
};

// Card Page Fetch - Alumni Public & Private, Team, Mentors Public & Private, Landing Page Private, WeekOverview
export const FetchCardPage = (pageQuery) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    setLoading(true);
    client.fetch(pageQuery).then((response) => {
      console.log(response);
      setResponse(response.filter((item) => !item._id.includes("draft")));
      setLoading(false);
    });
  }, [pageQuery]);

  return [loading, response];
};

// Profile Page Functions
// Toggle Dark/Light Mode
export const toggleDarkMode = (userid, darkMode, dispatch, authenticated) => {
  if (darkMode) {
    dispatch(authenticated.actions.toggleDarkMode(false));
    client
      .patch(userid)
      .set({ darkMode: false })
      .commit()
      .then((res) => console.log(res));
  } else if (!darkMode) {
    dispatch(authenticated.actions.toggleDarkMode(true));
    client
      .patch(userid)
      .set({ darkMode: true })
      .commit()
      .then((res) => console.log(res));
  }
};
// Fetch Booking Requests
export const FetchBookingRequests = (userid) => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const bookingQuery = `*[_type == "user" && _id == "${userid}"] {"booking": *[_type == "studentMentors" && references(^._id)]{fullName, bookingrequest}} `;
  useEffect(() => {
    client.fetch(bookingQuery).then((res) => {
      setBookingRequests(res[0].booking);
    });
  }, [bookingQuery]);

  return [bookingRequests];
};
