export default {
  name: "completed",
  title: "Completed",
  type: "document",
  fields: [
    {
      name: "lessonRef",
      title: "Lesson Title",
      type: "reference",
      to: [{ type: "lesson" }],
    },
    {
      name: "lessonReference",
      title: "Lesson Reference",
      type: "string",
    },
    {
      name: "userId",
      title: "UserId",
      type: "string",
    },
  ],
};
