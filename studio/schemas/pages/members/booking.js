export default {
  name: "booking",
  title: "Booking Page",
  type: "document",
  __experimental_actions: ["create", "update", /*'delete',*/ "publish"],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    // {
    //   name: "alumni",
    //   title: "Alumni",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: [{ type: "alumni" }],
    //     },
    //   ],
    // },
  ],
};
