export default {
  name: "startupschool",
  title: "Startup School Page",
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
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "introVideo",
      title: "Introduction Video",
      type: "url",
    },
  ],
};
