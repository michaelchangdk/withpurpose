export default {
  name: "studentMentors",
  title: "Student Mentors",
  type: "document",
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
              description:
                "Please fill in the weekday precisely as follows: Mon, Tue, Wed, Thu, Fri, Sat, Sun.",
              validation: (Rule) =>
                Rule.custom((name) => {
                  if (
                    name === "Mon" ||
                    name === "Tue" ||
                    name === "Wed" ||
                    name === "Thu" ||
                    name === "Fri" ||
                    name === "Sat" ||
                    name === "Sun"
                  ) {
                    return true;
                  }
                })
                  .error(
                    "Fill in the weekday precisely (Mon, Tue, Wed, Thu, Fri, Sat, Sun)"
                  )
                  .warning(
                    "Fill in the weekday precisely (Mon, Tue, Wed, Thu, Fri, Sat, Sun)"
                  ),
            },
            {
              name: "timeslots",
              title: "Time slot",
              type: "array",
              of: [{ type: "string" }],
              description:
                "Please fill in the start of the timeslot in the following format: e.g. 09.30, 17.00, etc",
            },
          ],
        },
      ],
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
<<<<<<< HEAD
              name: "booking",
              title: "Booking",
              type: "array",
              description:
                "This field is automatically filled in by the system.",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "student",
                      title: "Student",
                      type: "reference",
                      to: [{ type: "user" }],
                    },
                    { name: "datetime", title: "Datetime", type: "string" },
                  ],
                },
              ],
=======
              name: "student",
              title: "Student",
              type: "reference",
              to: [{ type: "user" }],
>>>>>>> booking
            },
            { name: "datetime", title: "Datetime", type: "string" },
          ],
        },
      ],
    },
  ],
};

// How to add validation to a field
// validation: (Rule) =>
// Rule.custom((name) => {
//   if (
//     name === "Monday" ||
//     name === "Tuesday" ||
//     name === "Wednesday" ||
//     name === "Thursday" ||
//     name === "Friday" ||
//     name === "Saturday" ||
//     name === "Sunday"
//   ) {
//     return true;
//   }
// })
//   .error("Fill in the weekday precisely ("Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday"))
//   .warning("Fill in the weekday precisely ("Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday"))
