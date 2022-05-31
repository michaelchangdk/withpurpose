export default {
  name: "landingpage",
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
      name: "landingpageelements",
      title: "Landing Page Cards",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "landingpageelements" }],
        },
      ],
    },
  ],
};
