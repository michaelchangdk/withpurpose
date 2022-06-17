export default {
  name: "landingpageelements",
  title: "Startup School Landing Page Elements",
  type: "document",
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "headline",
      title: "Headline",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "coverImage",
      title: "Card Cover image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "slug",
      title: "Site slug",
      type: "slug",
      description: "Not for editing.",
      readOnly: true,
    },
  ],
};
