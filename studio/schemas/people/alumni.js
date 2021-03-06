import { FaUserGraduate } from "react-icons/fa";

export default {
  name: "alumni",
  title: "Alumni",
  type: "document",
  icon: FaUserGraduate,
  fields: [
    {
      name: "fullName",
      title: "Full Name",
      type: "string",
    },
    {
      name: "city",
      title: "City",
      type: "string",
    },
    {
      name: "class",
      title: "Class of...",
      type: "string",
      description: "E.g. Spring/Summer 2021",
    },
    {
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    },
    {
      name: "profilePhoto",
      title: "Profile Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      media: "profilePhoto",
      title: "fullName",
      subtitle: "class",
    },
  },
};
