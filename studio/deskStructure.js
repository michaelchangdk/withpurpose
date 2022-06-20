import S from "@sanity/desk-tool/structure-builder";
import { FaUsers } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaPenFancy } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaUserNinja } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaRocket } from "react-icons/fa";
import { FaDiceD20 } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

export default () =>
  S.list()
    .title("With Purpose")
    .items([
      S.listItem()
        // Give it a title
        .title("Public Pages")
        .icon(FaLockOpen)
        .child(
          S.list()
            .title("Public Pages")
            .items([
              S.listItem()
                .title("Home Page")
                .icon(FaHome)
                .child(S.editor().schemaType("homepage").documentId("Home")),
              S.listItem()
                .title("Open Letter")
                .icon(FaPenFancy)
                .child(
                  S.editor().schemaType("openletter").documentId("openletter")
                ),
              S.listItem()
                .title("Startup School Info Page")
                .icon(FaInfoCircle)
                .child(
                  S.editor()
                    .schemaType("startupschoolinfo")
                    .documentId("startupschoolinfo")
                ),
              S.listItem()
                .title("Meet the Team")
                .icon(FaUserAstronaut)
                .child(
                  S.editor().schemaType("teampage").documentId("teampage")
                ),
              S.listItem()
                .title("Our Alumni")
                .icon(FaUserGraduate)
                .child(
                  S.editor().schemaType("alumnipage").documentId("alumnipage")
                ),
              S.listItem()
                .title("Mentors Page")
                .icon(FaUserTie)
                .child(
                  S.editor()
                    .schemaType("mentorspublic")
                    .documentId("mentorspublic")
                ),
              S.listItem()
                .title("Blog")
                .icon(FaNewspaper)
                // .schemaType("blogpost")
                // .child(S.documentTypeList("blogpost").title("Blog Post")),
                .child(
                  S.list()
                    .title("Blog")
                    .items([
                      S.listItem()
                        .title("Post")
                        .icon(FaFileAlt)
                        .child(
                          S.documentTypeList("blogpost").title("Blog Post")
                        ),
                      S.listItem()
                        .title("Author")
                        .icon(FaUserTag)
                        .child(S.documentTypeList("author").title("Author")),
                      S.listItem()
                        .title("Category")
                        .icon(FaTags)
                        .child(
                          S.documentTypeList("category").title("Category")
                        ),
                    ])
                ),
            ])
        ),

      S.listItem()
        // Give it a title
        .title("People")
        .icon(FaUsers)
        .child(
          // Make a list in the second pane called Portfolio
          S.list()
            .title("People")
            .items([
              // Add the first list item
              S.listItem()
                .title("Alumni")
                .schemaType("alumni")
                .child(S.documentTypeList("alumni").title("Alumni")),
              S.listItem()
                .title("Team")
                .schemaType("teamMembers")
                .child(S.documentTypeList("teamMembers").title("Team")),
              S.listItem()
                .title("Company Mentors")
                .schemaType("companyMentors")
                .child(
                  S.documentTypeList("companyMentors").title("Company Mentors")
                ),
              S.listItem()
                .title("Student Mentors")
                .schemaType("studentMentors")
                .child(
                  S.documentTypeList("studentMentors").title("Student Mentors")
                ),
            ])
        ),

      S.listItem()
        // Give it a title
        .title("Private Pages")
        .icon(FaLock)
        .child(
          S.list()
            .title("Private Pages")
            .items([
              // For making singleton documents
              S.listItem()
                .title("Landing Page")
                .icon(FaRocket)
                .child(
                  S.editor()
                    .schemaType("landingpage")
                    .documentId("b8f2ad7b-7943-41ad-bd0d-387c9dcf4a77")
                ),
              S.listItem()
                .title("Startup School")
                .icon(FaSchool)
                .child(
                  S.editor()
                    .schemaType("startupschool")
                    .documentId("startupschool")
                ),
              S.listItem()
                .title("Masterclasses")
                .icon(FaDiceD20)
                .child(
                  S.editor()
                    .schemaType("masterclasses")
                    .documentId("masterclasses")
                ),
              S.listItem()
                .title("Mentors")
                .icon(FaUserNinja)
                .child(S.editor().schemaType("mentors").documentId("mentors")),
              S.listItem()
                .title("Community")
                .icon(FaUserGraduate)
                .child(
                  S.editor().schemaType("community").documentId("community")
                ),
              S.listItem()
                .title("Booking")
                .icon(FaClock)
                .child(S.editor().schemaType("booking").documentId("booking")),
            ])
        ),

      // Make a new list item
      S.listItem()
        .title("School")
        .icon(FaSchool)
        .child(
          S.list()
            .title("School")
            .items([
              S.listItem()
                .title("Weeks")
                .schemaType("week")
                .child(S.documentTypeList("week").title("Weeks")),
              S.listItem()
                .title("Modules")
                .schemaType("module")
                .child(S.documentTypeList("module").title("Modules")),
              S.listItem()
                .title("Lesson")
                .schemaType("lesson")
                .child(S.documentTypeList("lesson").title("Lessons")),
            ])
        ),

      // Add a visual divider (optional)
      S.divider(),

      S.listItem()
        .title("User Management")
        .schemaType("user")
        .child(S.documentTypeList("user").title("Users")),
      S.listItem()
        .title("Site settings")
        .icon(FaCogs)
        .child(S.editor().schemaType("settings").documentId("settings")),

      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "week",
            "module",
            "lesson",
            "alumni",
            "teamMembers",
            "companyMentors",
            "studentMentors",
            "landingpage",
            "homepage",
            "blogpost",
            "author",
            "category",
            "blockContent",
            "user",
            "completed",
            "landingpageelements",
            "media.tag",
            "landingpageelements",
            "startupschool",
            "masterclasses",
            "mentors",
            "community",
            "openletter",
            "startupschoolinfo",
            "booking",
            "mentorspublic",
            "teampage",
            "alumnipage",
            "settings",
          ].includes(listItem.getId())
      ),
    ]);
