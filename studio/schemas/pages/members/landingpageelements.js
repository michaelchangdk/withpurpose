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
      name: "subtitle",
      title: "Subtitle",
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
      name: "order",
      title: "Order",
      type: "number",
      description: "Order - 1, 2, 3, 4 from left to right",
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
      name: "coverImage",
      title: "Card Cover image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "linkTo",
      title: "Link to",
      type: "string",
      description: "Please don't edit.",
    },
  ],
};
