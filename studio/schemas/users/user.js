export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "displayName",
      title: "Display name",
      type: "string",
      description: "Do not edit!",
    },
    {
      name: "uniqueid",
      title: "Unique ID - Google",
      type: "string",
      description: "Do not edit!",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      description: "Do not edit!",
    },
    {
      name: "darkMode",
      title: "Dark mode",
      type: "boolean",
      description: "Do not edit!",
    },
    {
      name: "approvedSchool",
      title: "Approved School?",
      type: "boolean",
    },
    {
      name: "approvedWeek0",
      title: "Approved Week 0?",
      type: "boolean",
    },
    {
      name: "approvedWeek1",
      title: "Approved Week 1?",
      type: "boolean",
    },
    {
      name: "approvedWeek23",
      title: "Approved Week 2 & 3?",
      type: "boolean",
    },
    {
      name: "approvedWeek4",
      title: "Approved Week 4?",
      type: "boolean",
    },
    {
      name: "approvedWeek5",
      title: "Approved Week 5?",
      type: "boolean",
    },
    {
      name: "approvedWeek6",
      title: "Approved Week 6?",
      type: "boolean",
    },
    {
      name: "approvedMentorBooking",
      title: "Approved Mentor Booking?",
      type: "boolean",
    },
    {
      name: "approvedCommunity",
      title: "Approved Community Page?",
      type: "boolean",
    },
    {
      name: "approvedMasterClass",
      title: "Approved Master Class?",
      type: "boolean",
    },
    {
      name: "completed",
      title: "Completed",
      type: "array",
      of: [{ type: "completed" }],
    },
  ],
};
