export default {
  name: "homepage",
  title: "Home Page",
  type: "document",
  __experimental_actions: [/*"create",*/ "update", /*'delete',*/ "publish"],
  fields: [
    {
      name: "headerHeadline",
      title: "Header Headline",
      type: "string",
    },
    {
      name: "headerText",
      title: "Header Text",
      type: "text",
    },
    {
      name: "statisticsHeader",
      title: "Statistics Headline",
      type: "string",
    },
    {
      name: "statisticsText",
      title: "Statistics Text",
      type: "text",
    },
    {
      name: "statisticsArray",
      title: "Statistics Array",
      type: "array",
      of: [
        { name: "number", type: "string" },
        { name: "description", type: "string" },
      ],
      description:
        "Add up to 3 statistics, first is the number, second is the text",
    },
  ],
};
