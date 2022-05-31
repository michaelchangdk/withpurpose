export default {
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Lesson Title",
      type: "string",
      description:
        "Please use the following convention: W0M1L01 (Week 0, Module 1, Lesson 01) for ordering the lessons in the correct order.",
    },
    {
      name: "order",
      title: "Lesson Order",
      type: "number",
      description: "E.g. 1, 2, 3, 4...",
    },
    {
      name: "name",
      title: "Lesson Name",
      type: "string",
      description: "E.g. Three Ways to Start a Company",
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      description: "Estimated duration to complete, e.g. 1h 20m, 5m, etc.",
    },
    {
      name: "isVideo",
      title: "Is this task a video?",
      type: "boolean",
      description: "Toggle on if the task is a video.",
    },
    {
      name: "isLink",
      title: "Is this task a link?",
      type: "boolean",
      description: "Toggle on if the task is a link.",
    },
    {
      name: "isPDF",
      title: "Is this task a PDF?",
      type: "boolean",
      description: "Toggle on if the task is a PDF.",
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description:
        "If the lesson is a video, please do not fill out the fields below this URL.",
    },
    {
      name: "taskDescription",
      title: "Task Description",
      type: "string",
      description:
        "Description for linked task, e.g. 'Use the Test Card to create assumptions based on your Business Model Canvas', or 'Here's your copy of the Business Model Canvas!'",
    },
    {
      name: "otherUrlText",
      title: "Task, Resource - Link Text",
      type: "string",
      description:
        "The text for the linked task. E.g. 'Don't forget to fill out this form!', or 'Practice Template Week 1', etc.",
    },
    {
      name: "otherUrl",
      title: "Task or Resource URL",
      type: "url",
    },
    {
      name: "file",
      title: "PDF or File Upload",
      type: "file",
    },
  ],
};
