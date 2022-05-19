import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("With Purpose")
    .items([
      // Make a new list item
      S.listItem()
        // Give it a title
        .title("School")
        .child(
          // Make a list in the second pane called Portfolio
          S.list()
            .title("School")
            .items([
              // Add the first list item
              S.listItem()
                .title("Weeks")
                // This automatically gives it properties from the project type
                .schemaType("week")
                // When you open this list item, list out the documents
                // of the type “project"
                .child(S.documentTypeList("week").title("Modules")),
              // Add a second list item
              S.listItem()
                .title("Modules")
                .schemaType("module")
                // When you open this list item, list out the documents
                // of the type category"
                .child(S.documentTypeList("module").title("Modules")),
              S.listItem()
                .title("Lesson")
                .schemaType("lesson")
                // When you open this list item, list out the documents
                // of the type category"
                .child(S.documentTypeList("lesson").title("Lessons")),
            ])
        ),

      S.listItem()
        // Give it a title
        .title("People")
        .child(
          // Make a list in the second pane called Portfolio
          S.list()
            .title("People")
            .items([
              // Add the first list item
              S.listItem()
                .title("Alumni")
                // This automatically gives it properties from the project type
                .schemaType("alumni")
                // When you open this list item, list out the documents
                // of the type “project"
                .child(S.documentTypeList("alumni").title("Alumni")),
              // Add a second list item
              S.listItem()
                .title("Team")
                .schemaType("teamMembers")
                // When you open this list item, list out the documents
                // of the type category"
                .child(S.documentTypeList("teamMembers").title("Team")),
              S.listItem()
                .title("Company Mentors")
                .schemaType("companyMentors")
                // When you open this list item, list out the documents
                // of the type category"
                .child(
                  S.documentTypeList("companyMentors").title("Company Mentors")
                ),
              S.listItem()
                .title("Student Mentors")
                .schemaType("studentMentors")
                // When you open this list item, list out the documents
                // of the type category"
                .child(
                  S.documentTypeList("studentMentors").title("Student Mentors")
                ),
            ])
        ),

      S.listItem()
        // Give it a title
        .title("Public Pages")
        .child(
          S.list()
            .title("Public Pages")
            .items([
              // Add the first list item
              S.listItem()
                .title("Public Home Page")
                .schemaType("homepage")
                .child(S.documentTypeList("homepage").title("Home")),
              S.listItem()
                .title("Blog posts")
                .schemaType("blogpost")
                .child(S.documentTypeList("blogpost").title("Blog Post")),
              // S.listItem()
              //   .title("Company Mentors")
              //   .schemaType("companyMentors")
              //   .child(
              //     S.documentTypeList("companyMentors").title("Company Mentors")
              //   ),
              // S.listItem()
              //   .title("Student Mentors")
              //   .schemaType("studentMentors")
              //   .child(
              //     S.documentTypeList("studentMentors").title("Student Mentors")
              //   ),
            ])
        ),

      S.listItem()
        // Give it a title
        .title("Private Pages")
        .child(
          S.list()
            .title("Private Pages")
            .items([
              // Add the first list item
              S.listItem()
                .title("Landing page elements")
                .schemaType("landingpage")
                .child(S.documentTypeList("landingpage").title("landingpage")),
              // S.listItem()
              //   .title("Team")
              //   .schemaType("teamMembers")
              //   .child(S.documentTypeList("teamMembers").title("Team")),
              // S.listItem()
              //   .title("Company Mentors")
              //   .schemaType("companyMentors")
              //   .child(
              //     S.documentTypeList("companyMentors").title("Company Mentors")
              //   ),
              // S.listItem()
              //   .title("Student Mentors")
              //   .schemaType("studentMentors")
              //   .child(
              //     S.documentTypeList("studentMentors").title("Student Mentors")
              //   ),
            ])
        ),

      S.listItem()
        // Give it a title
        .title("User Info & Progress")
        .child(
          S.list()
            .title("Users")
            .items([
              S.listItem()
                .title("Users")
                .schemaType("user")
                .child(S.documentTypeList("user").title("User")),
              // S.listItem()
              //   .title("Completed")
              //   .schemaType("completed")
              //   .child(S.documentTypeList("completed").title("completed")),
            ])
        ),

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
            "user",
            "completed",
          ].includes(listItem.getId())
      ),
    ]);
