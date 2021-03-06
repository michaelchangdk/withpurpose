import { FaCalendarWeek } from "react-icons/fa";

export default {
  name: "module",
  title: "Module",
  type: "document",
  icon: FaCalendarWeek,
  fields: [
    {
      name: "slug",
      title: "Module Title / Slug",
      type: "string",
      description:
        "Name the week after these conventions: W#M#, e.g. W0M1 for Week 0 Module 1. Modules for masterclasses should follow the M#M# convention, e.g. M1M2 for Masterclass Module 1. These names should be unique since they are used as the URL for the module.",
    },
    {
      name: "name",
      title: "Module Name",
      type: "string",
      description: "E.g. Week 0 - Finding and selecting a startup idea",
    },
    {
      name: "duration",
      title: "Module Duration",
      type: "string",
      description:
        "Estimated total module duration, in this format: 1h 20m or 45m (if less than an hour)",
    },
    {
      name: "type",
      title: "Module Type",
      type: "string",
      description:
        "Fill in precisely: Live session, Course videos, Exercises, Optional resources",
      options: {
        list: [
          "Live session",
          "Course videos",
          "Exercises",
          "Optional resources",
        ],
      },
    },
    {
      name: "description",
      title: "Module Description",
      type: "text",
      description: `This description is only for modules that are PDF or document based. E.g. To help you practice and implement the learnings, we have prepared two exercises. One will help you to find out how big the market is you are targeting, and the other one will help you put the learnings from the BMC video into practice.`,
    },
    {
      name: "lesson",
      title: "Lesson",
      type: "array",
      description:
        "Please note that the order you place the lessons is how they will be displayed to the user.",
      of: [
        {
          type: "reference",
          to: [{ type: "lesson" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "slug",
      subtitle: "name",
    },
  },
};
