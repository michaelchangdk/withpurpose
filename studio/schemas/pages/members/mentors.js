export default {
  name: "mentors",
  title: "Mentors Page",
  type: "document",
  __experimental_actions: [/*"create",*/ "update", /*'delete',*/ "publish"],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "studentmentors",
      title: "Student Mentors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "studentMentors" }],
        },
      ],
      description:
        "Add student mentors to this array to allow students to book meetings with them.",
    },
  ],
};
