export default {
  name: "landingpage",
  title: "Startup School Landing Page Elements",
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
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "Introduction video link.",
    },
    {
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
