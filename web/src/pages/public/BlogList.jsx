import React, { useState, useEffect } from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";

import { client } from "../../client";

import {PortableText} from '@portabletext/react'



const BlogList = () => {
  // const [loading, setLoading] = useState(true);
  const [blogposts, setBlogposts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  

  const fetchBlogposts = async () => {
    // setLoading(true);
    const blogpostQuery = `*[_type == "blogpost"] {_id, title}`;
    const fetch = await client.fetch(blogpostQuery);
    const response = await fetch;
    setBlogposts(response);
    console.log(response);
    // console.log(response[0])
    // setLoading(false);
  };

  const fetchPost = async (id) => {
    const postQuery = `*[_type == "blogpost" && _id == '${id}']`;
    const fetch = await client.fetch(postQuery);
    const response = await fetch;
    setCurrentPost(response[0]);
  }

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
            // <PortableText
            //   key={blogpost._id}
            //   value={blogpost.title}
            // />
            <button key={blogpost._id} onClick={() => fetchPost(blogpost._id)}>
              <Typography>{blogpost.title}</Typography>
            </button>
            
          )
        })
        
        }
        <PortableText
          value={currentPost?.body}
        />
        
      </Box>
    </ThemeProvider>
  );
};

export default BlogList;
