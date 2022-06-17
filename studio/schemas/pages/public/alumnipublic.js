export default {
  name: "alumnipage",
  title: "Alumni Page",
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
      name: "alumni",
      title: "Our Alumni",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "alumni" }],
        },
      ],
      description:
        "Add alumni to this array to display them on the public alumni page. Please note the order you add them will be the order they are displayed.",
    },
  ],
};
