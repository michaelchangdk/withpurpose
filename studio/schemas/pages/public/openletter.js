export default {
  name: "openletter",
  title: "Open Letter",
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
      description: "Option to add a subtitle to the page.",
    },
    {
      name: "slug",
      title: "Slug",
      type: "string",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],
};
