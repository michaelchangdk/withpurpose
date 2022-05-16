export default {
  name: "blogpost",
  title: "Blogpost",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "duration",
      title: "Duration - estimated time to read",
      type: "string",
      description: "E.g. 1 min read",
    },
    {
      name: "image",
      title: "Blog image",
      type: "image",
    },
  ],
};
