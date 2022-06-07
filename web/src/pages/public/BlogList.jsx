import React, { useState, useEffect } from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";

import { client } from "../../client";

import {PortableText} from '@portabletext/react'



const BlogList = () => {
  // const [loading, setLoading] = useState(true);
  const [blogposts, setBlogposts] = useState([]);
  

  const fetchBlogposts = async () => {
    // setLoading(true);
    const blogpostQuery = `*[_type == "blogpost"]`;
    const fetch = await client.fetch(blogpostQuery);
    const response = await fetch;
    setBlogposts(response);
    // console.log(response[0])
    // setLoading(false);
  };

  useEffect(() => {
    fetchBlogposts();
  }, []);

  return (
    <ThemeProvider theme={darkMode}>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          width: "100%",
          minHeight: "100vh",
          height: "100%",
        }}
      >
        <PublicHeader />
        Blog Posts
        {blogposts.map((blogpost) => {
          return (
            <PortableText
              key={blogpost._id}
              value={blogpost.body}
            />
          )
        })
          
        }
      </Box>
    </ThemeProvider>
  );
};

export default BlogList;
