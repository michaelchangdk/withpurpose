import { FaUserEdit } from "react-icons/fa";

export default {
  name: "user",
  title: "User",
  type: "document",
  icon: FaUserEdit,
  __experimental_actions: [/*"create",*/ "update", "delete", "publish"],
  fields: [
    {
      name: "displayName",
      title: "Display name",
      type: "string",
      description: "Only editable by user",
      readOnly: true,
    },
    {
      name: "uniqueid",
      title: "Unique ID - Google",
      type: "string",
      description: "Read only - provided by Firebase",
      readOnly: true,
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      description: "Only editable by user",
      readOnly: true,
    },
    // {
    //   name: "avatar",
    //   title: "Avatar",
    //   type: "image",
    // },
    {
      name: "photoURL",
      title: "Avatar URL",
      type: "string",
      description: "Read only - provided by Firebase",
      readOnly: true,
    },
    {
      name: "darkMode",
      title: "Dark mode",
      type: "boolean",
      description: "Only editable by user",
      readOnly: true,
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
      title: "Approved Masterclasses?",
      type: "boolean",
    },
    {
      name: "bookingrequest",
      title: "Booking Request",
      type: "array",
      description: "This field is automatically filled in by the system.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "studentMentors",
              title: "Mentor",
              type: "reference",
              to: [{ type: "studentMentors" }],
            },
            {
              name: "mentor",
              title: "Mentor",
              type: "string",
            },
            { name: "datetime", title: "Datetime", type: "string" },
          ],
        },
      ],
    },
    {
      name: "completed",
      title: "Completed Lessons",
      type: "array",
      of: [{ type: "completed" }],
      description:
        "Do not edit! This is the array of lessons users have marked as completed.",
    },
  ],
  preview: {
    select: {
      title: "displayName",
      subtitle: "email",
    },
  },
};
