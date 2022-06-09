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
                "Please fill in the weekday precisely as follows: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.",
              validation: (Rule) =>
                Rule.custom((name) => {
                  if (
                    name === "Monday" ||
                    name === "Tuesday" ||
                    name === "Wednesday" ||
                    name === "Thursday" ||
                    name === "Friday" ||
                    name === "Saturday" ||
                    name === "Sunday"
                  ) {
                    return true;
                  }
                })
                  .error(
                    "Fill in the weekday precisely (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)"
                  )
                  .warning(
                    "Fill in the weekday precisely (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)"
                  ),
            },
            {
              name: "startTime",
              title: "Start Time",
              type: "number",
              description:
                "Please fill in the start and end time of the availability using numbers in a 24 hour format with 0.5 to demarcate half-hours. E.g. 9.5 would be 09.30 A.M.",
            },
            {
              name: "endTime",
              title: "End Time",
              type: "number",
              description:
                "Please fill in the start and end time of the availability using numbers in a 24 hour format with 0.5 to demarcate half-hours. E.g. 9.5 would be 09.30 A.M.",
            },
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
