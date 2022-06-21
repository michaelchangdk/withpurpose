import { FaUserAstronaut } from "react-icons/fa";

export default {
  name: "teamMembers",
  title: "Team Member",
  type: "document",
  icon: FaUserAstronaut,
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
      name: "quote",
      title: "Quote",
      type: "string",
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
};
