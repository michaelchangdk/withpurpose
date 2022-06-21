export default {
  name: "homepage",
  title: "Home Page",
  type: "document",
  __experimental_actions: [/*"create",*/ "update", /*'delete',*/ "publish"],
  fields: [
    {
      name: "headerHeadline",
      title: "Header Section Headline",
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
      type: "blockContent",
    },
    {
      name: "statisticsArray",
      title: "Statistics Array",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "string",
            },
          ],
        },
      ],
      description: "Add 3 statistics, first is the number, second is the text",
    },
    {
      name: "startupHeadline",
      title: "Startup Headline",
      type: "string",
    },
    {
      name: "startupText",
      title: "Startup Text",
      type: "text",
    },
    {
      name: "stepsArray",
      title: "Steps Array",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "string",
            },
          ],
        },
      ],
      description:
        "The 6 steps for the startup school, first is the title, second is the text",
    },
    {
      name: "alumniHeadline",
      title: "Alumni Section Headline",
      type: "string",
    },
    {
      name: "alumniArray",
      title: "Alumni Array",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "photo",
              title: "Photo",
              type: "image",
            },
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "quote",
              title: "Quote",
              type: "text",
            },
          ],
        },
      ],
      description: "Add 3 Alumni including their photo, name, and quote.",
    },
    {
      name: "awardHeadline",
      title: "Award Section Headline",
      type: "string",
    },
    {
      name: "awardArray",
      title: "Alumni Array",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "photo",
              title: "Photo",
              type: "image",
            },
            {
              name: "description",
              title: "Description",
              type: "blockContent",
            },
          ],
        },
      ],
      description: "Add 3 awards including their photo and description.",
    },
  ],
};
