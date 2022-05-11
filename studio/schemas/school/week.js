export default {
  name: "week",
  title: "Week",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Week Name",
      type: "string",
      description:
        "E.g. Week0, Week1, Week2-3, etc. This is for ordering the weeks correctly in the site",
    },
    {
      name: "title",
      title: "Week Title",
      type: "string",
      description: "E.g. Week 0",
    },
    {
      name: "subtitle",
      title: "Week Subtitle",
      type: "string",
      description: "E.g. How to come up with a startup idea",
    },
    {
      name: "description",
      title: "Week Description",
      type: "text",
      description:
        "E.g. These short videos should help you decide which idea to focus on - if you have multiple. Or, help you find an idea if you still don't have one. While the second might take much longer, we suggest you select an idea you want to work on during the startup school, in order to help you learn better.",
    },
    {
      name: "liveSessionTitle",
      title: "Live Session Title",
      type: "string",
      description: "E.g. Kickoff with Nima Tisdall, Blue Lobster",
    },
    {
      name: "liveSessionDate",
      title: "Live Session Date",
      type: "datetime",
    },
    {
      name: "liveSessionTimeDisplay",
      title: "Display live session time?",
      type: "boolean",
      description:
        "Turn on if you want to display session time, leave off if time is not yet determined. Please remember to check the time is correct in the timepicker before switching on.",
    },
    {
      name: "module",
      title: "Modules",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "module" }],
        },
      ],
    },
  ],
};
