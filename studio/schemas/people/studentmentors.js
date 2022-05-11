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
  ],
};
