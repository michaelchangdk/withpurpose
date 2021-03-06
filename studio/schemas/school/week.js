import { FaCalendar } from "react-icons/fa";

export default {
  name: "week",
  title: "Week",
  type: "document",
  icon: FaCalendar,
  fields: [
    {
      name: "name",
      title: "Week Slug",
      type: "string",
      description:
        "E.g. Week0, Week1, Week2-3, etc. This is for ordering the weeks correctly in the site and used for navigation, please do not change this.",
    },
    {
      name: "title",
      title: "Week Title",
      type: "string",
      description: "E.g. Week 0",
    },
    {
      name: "keyword",
      title: "Week Keyword",
      type: "string",
      description: "E.g. Translation",
    },
    {
      name: "shortDescription",
      title: "Week Short Description",
      type: "string",
      description: "E.g. Translate your Startup Vision Into a Business Model",
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
      type: "string",
    },
    {
      name: "order",
      title: "Order of weeks",
      type: "number",
      description: "Do not edit!",
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
      name: "module",
      title: "Modules",
      type: "array",
      description:
        "Please note that the order you place the modules is how they will be displayed to the user.",
      of: [
        {
          type: "reference",
          to: [{ type: "module" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      media: "heroImage",
      title: "title",
      subtitle: "keyword",
    },
  },
};
