export default {
  name: "landingpage",
  title: "Landing Page",
  type: "document",
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
      name: "order",
      title: "Order",
      type: "number",
      description: "Order - 1, 2, 3, 4 from left to right",
    },
    {
      name: "linkTo",
      title: "Link to",
      type: "string",
      description: "Please don't edit.",
    },
  ],
};
