import { FaUserTie } from "react-icons/fa";

export default {
  name: "companyMentors",
  title: "Company Mentors",
  type: "document",
  icon: FaUserTie,
  fields: [
    {
      name: "fullName",
      title: "Full Name",
      type: "string",
    },
    {
      name: "company",
      title: "Company",
      type: "string",
    },
    {
      name: "bio",
      title: "Bio",
      type: "text",
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
      subtitle: "company",
    },
  },
};
