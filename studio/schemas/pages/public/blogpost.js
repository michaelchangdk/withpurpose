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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
          source: "title",
          maxLength: 96
      }
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: {type: "author"}
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
      options: {
        hotspot: true,
      },
    },
    // {
    //   name: "categories",
    //   title: "Categories",
    //   type: "array",
    //   of: [{type: "reference", to {type: category}}]
    // },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime"
    },
    // {
    //   name: "body",
    //   title: "Body",
    //   type: "blockContent"
    // }
  ],
};
