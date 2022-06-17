export default {
  name: "teampage",
  title: "Team Page",
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
      name: "team",
      title: "Meet the Team",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "teamMembers" }],
        },
      ],
      description:
        "Add team members to this array to display them on the meet the team page. Please note the order you add them will be the order they are displayed.",
    },
  ],
};
