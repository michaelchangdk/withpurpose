export default {
  name: "openletter",
  title: "Open Letter",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "string"
    },
    {
      name: "headline",
      title: "Headline",
      type: "string",
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ],
};
