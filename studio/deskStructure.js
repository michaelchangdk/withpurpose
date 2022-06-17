import S from "@sanity/desk-tool/structure-builder";
import schoolIcon from "./components/schoolIcon";
import peopleIcon from "./components/peopleIcon";
import publicIcon from "./components/publicIcon";
import privateIcon from "./components/privateIcon";
import userIcon from "./components/userIcon";

export default () =>
  S.list()
    .title("With Purpose")
    .items([
      S.listItem()
        // Give it a title
        .title("Public Pages")
        .icon(publicIcon)
        .child(
          S.list()
            .title("Public Pages")
            .items([
              // S.listItem()
              //   .title("Public Home Page")
              //   .child(S.editor().schemaType("homepage").documentId("Home")),
              S.listItem()
                .title("Open Letter")
                .child(
                  S.editor().schemaType("openletter").documentId("openletter")
                ),
              S.listItem()
                .title("Startup School Info Page")
                .child(
                  S.editor()
                    .schemaType("startupschoolinfo")
                    .documentId("startupschoolinfo")
                ),
              S.listItem()
                .title("Meet the Team")
                .child(
                  S.editor().schemaType("teampage").documentId("teampage")
                ),
              S.listItem()
                .title("Our Alumni")
                .child(
                  S.editor().schemaType("alumnipage").documentId("alumnipage")
                ),
              S.listItem()
                .title("Mentors Page")
                .child(
                  S.editor()
                    .schemaType("mentorspublic")
                    .documentId("mentorspublic")
                ),
              S.listItem()
                .title("Blog")
                // .schemaType("blogpost")
                // .child(S.documentTypeList("blogpost").title("Blog Post")),
                .child(
                  S.list()
                    .title("Blog")
                    .items([
                      S.listItem()
                        .title("Post")
                        .child(
                          S.documentTypeList("blogpost").title("Blog Post")
                        ),
                      S.listItem()
                        .title("Author")
                        .child(S.documentTypeList("author").title("Author")),
                      S.listItem()
                        .title("Category")
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
        .icon(peopleIcon)
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
        .icon(privateIcon)
        .child(
          S.list()
            .title("Private Pages")
            .items([
              // For making singleton documents
              S.listItem()
                .title("Landing page")
                .child(
                  S.editor()
                    .schemaType("landingpage")
                    .documentId("b8f2ad7b-7943-41ad-bd0d-387c9dcf4a77")
                ),
              S.listItem()
                .title("Startup School")
                .child(
                  S.editor()
                    .schemaType("startupschool")
                    .documentId("startupschool")
                ),
              S.listItem()
                .title("Masterclasses")
                .child(
                  S.editor()
                    .schemaType("masterclasses")
                    .documentId("masterclasses")
                ),
              S.listItem()
                .title("Mentors")
                .child(S.editor().schemaType("mentors").documentId("mentors")),
              S.listItem()
                .title("Community")
                .child(
                  S.editor().schemaType("community").documentId("community")
                ),
              S.listItem()
                .title("Booking")
                .child(S.editor().schemaType("booking").documentId("booking")),
            ])
        ),

      // Make a new list item
      S.listItem()
        .title("School")
        .icon(schoolIcon)
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
        .icon(userIcon)
        .schemaType("user")
        .child(S.documentTypeList("user").title("Users")),

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
          ].includes(listItem.getId())
      ),
    ]);
