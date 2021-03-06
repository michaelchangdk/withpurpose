import { FaUserNinja } from "react-icons/fa";

export default {
  name: "studentMentors",
  title: "Student Mentors",
  type: "document",
  icon: FaUserNinja,
  fields: [
    {
      name: "fullName",
      title: "Full Name",
      type: "string",
    },
    {
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    },
    {
      name: "bio",
      title: "Bio / Description",
      type: "text",
    },
    {
      name: "profilePhoto",
      title: "Profile Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "topics",
      title: "Topics X would love to discuss with you:",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "availability",
      title: "Availability",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              title: "Weekday",
              type: "string",
              options: {
                list: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              },
            },
            {
              name: "timeslots",
              title: "Time slot",
              type: "array",
              of: [{ type: "string" }],
              description:
                "IMPORTANT: Please fill in the start of the timeslot in the following format, using . and not : for consistency (e.g. 09.30, 17.00, etc)",
            },
          ],
        },
      ],
    },
    // {
    //   name: "bookingrequest",
    //   title: "Booking Request",
    //   type: "array",
    //   description: "This field is automatically filled in by the system.",
    //   of: [
    //     {
    //       type: "object",
    //       fields: [
    //         {
    //           name: "student",
    //           title: "Student",
    //           type: "reference",
    //           to: [{ type: "user" }],
    //         },
    //         {
    //           name: "mentor",
    //           title: "Mentor",
    //           type: "string",
    //         },
    //         { name: "datetime", title: "Datetime", type: "string" },
    //       ],
    //     },
    //   ],
    // },
  ],
};
