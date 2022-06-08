import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {PortableText} from '@portabletext/react';
import { Box, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import { client } from "../../client";

import PublicHeader from "../../components/public/PublicHeader";

const BlogPost = () => {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState(null);

  const fetchPost = async () => {
    const postQuery = `*[_type == "blogpost" && _id == '${id}']`;
    const fetch = await client.fetch(postQuery);
    const response = await fetch;
    setCurrentPost(response[0]);
  };

  useEffect(() => {
    fetchPost();
  })


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
        <Stack sx={{ maxWidth: '80%', margin: '0 auto'}}>
          <PublicHeader />
          <PortableText
            value={currentPost?.body}
          />
        </Stack>
      </Box>
    </ThemeProvider>
    
    );
};

export default BlogPost;
