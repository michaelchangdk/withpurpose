// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import user from "./users/user";
import lesson from "./school/lesson";
import week from "./school/week";
import module from "./school/module";
import teamMembers from "./people/teamMember";
import alumni from "./people/alumni";
import studentMentors from "./people/studentmentors";
import companyMentors from "./people/companymentors";
import homepage from "./pages/public/homepage";
import blogpost from "./pages/public/blogpost";
import author from "./pages/public/blog/author";
import blockContent from "./pages/public/blog/blockContent";
import category from "./pages/public/blog/category";
import completed from "./school/completed";
import community from "./pages/members/community";
import masterclasses from "./pages/members/masterclasses";
import mentors from "./pages/members/mentors";
import startupschool from "./pages/members/startupschool";
import openletter from "./pages/public/openletter";
import startupschoolinfo from "./pages/public/startupschoolinfo";
import booking from "./pages/members/booking";

// Import Pages
import landingpage from "./pages/members/landingpage";
import landingpageelements from "./pages/members/landingpageelements";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    user,
    week,
    module,
    lesson,
    teamMembers,
    alumni,
    studentMentors,
    companyMentors,
    landingpage,
    homepage,
    blogpost,
    author,
    blockContent,
    category,
    completed,
    landingpageelements,
    community,
    masterclasses,
    mentors,
    startupschool,
    openletter,
    startupschoolinfo,
    booking,
    /* Your types here! */
  ]),
});
