export default {
  name: "startupschoolinfo",
  title: "Startup School Info Page",
  type: "document",
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
      name: "intro",
      title: "Introduction",
      type: "blockContent",
    },
    {
      name: "cta",
      title: "CTA header",
      type: "string",
    },
    {
      name: "expectationsHeader",
      title: "Expectations header",
      type: "string",
    },
    {
      name: "expectations",
      title: "What to expect",
      type: "blockContent",
    },
    {
      name: "threeColumns",
      title: "When, Where, How",
      type: "array",
      description: "Please limit these to 3 items",
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
    },
    {
      name: "blockOne",
      title: "Block one for next paragraph section",
      description: "Limit this to two items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", title: "Image / Icon", type: "image" },
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
    },
    {
      name: "paragraphOne",
      title: "Paragraph Section One",
      type: "blockContent",
    },
    {
      name: "blockTwo",
      title: "Block two for paragraph section",
      description: "Limit this to two items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", title: "Image / Icon", type: "image" },
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
    },
    {
      name: "paragraphTwo",
      title: "Paragraph Section Two",
      type: "blockContent",
    },
  ],
};
