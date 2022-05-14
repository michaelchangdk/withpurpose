export default {
  name: "module",
  title: "Module",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Module Name",
      type: "string",
      description:
        "Name the week after these conventions: W#M#, e.g. W0M1 for Week 0 Module 1. This is to keep the modules in the correct order.",
    },
    {
      name: "order",
      title: "Module Order",
      type: "number",
      description: "E.g. 1, 2, 3, 4...",
    },
    {
      name: "title",
      title: "Module Title",
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
      validation: (Rule) =>
        Rule.custom((name) => {
          if (
            name === "Live session" ||
            name === "Course videos" ||
            name === "Exercises" ||
            name === "Optional resources"
          ) {
            return true;
          }
        })
          .error("Fill in precisely one of the listed options.")
          .warning("Fill in precisely one of the listed options."),
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
      of: [
        {
          type: "reference",
          to: [{ type: "lesson" }],
        },
      ],
    },
  ],
};
