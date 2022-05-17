export default {
  name: "completed",
  title: "Completed",
  type: "document",
  fields: [
    {
      name: "userId",
      title: "UserId",
      type: "string",
    },
    {
      name: "completed",
      title: "Complete?",
      type: "boolean",
    },
    // Not sure how to reference user here
    // {
    //   name: "user",
    //   title: "User",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: [{ type: "user" }],
    //     },
    //   ],
    // },
  ],
};
