export default {
  name: "mentorspublic",
  title: "Mentors Page",
  type: "document",
  __experimental_actions: [/*"create",*/ "update", /*"delete",*/ "publish"],
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
      description: "Option to add a subtitle to the page.",
    },
    {
      name: "mentors",
      title: "Company Mentors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "companyMentors" }],
        },
      ],
      description:
        "Add company members to this array to display them on the public mentors page. Please note the order you add them will be the order they are displayed.",
    },
  ],
};
