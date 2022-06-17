export default {
  name: "masterclasses",
  title: "Masterclasses Page",
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
      title: "Masterclasses Description",
      type: "text",
      description:
        "Optional: Add a description container for the masterclasses page",
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
      name: "masterclassModules",
      title: "Masterclass Modules",
      type: "array",
      description:
        "Please note that the order you place the modules is how they will be displayed to the user.",
      of: [
        {
          type: "reference",
          to: [{ type: "module" }],
        },
      ],
    },
  ],
};
