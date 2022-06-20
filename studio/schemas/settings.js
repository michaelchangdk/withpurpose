export default {
  name: "settings",
  title: "Settings",
  type: "document",
  __experimental_actions: [/*"create",*/ "update", /*"delete",*/ "publish"],
  fields: [
    {
      name: "title",
      title: "Settings",
      type: "string",
      readOnly: true,
      hidden: true,
    },
    {
      name: "registrationToggle",
      title: "Open to registration",
      type: "boolean",
      description: "Open the site to new registrations.",
    },
    {
      name: "modalText",
      title: "Modal text",
      type: "text",
      description:
        "The text that is displayed in the modal when users don't have access.",
    },
  ],
};
