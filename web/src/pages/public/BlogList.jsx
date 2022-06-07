import React, { useState, useEffect } from "react";
import PublicHeader from "../../components/public/PublicHeader";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";

import { client, urlFor } from "../../client";

import {PortableText} from '@portabletext/react';


const BlogList = () => {
  // const [loading, setLoading] = useState(true);
  const [blogposts, setBlogposts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  

  const fetchBlogposts = async () => {
    // setLoading(true);
    const blogpostQuery = `*[_type == "blogpost"] {_id, title, image}`;
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
  };

  const myPortableTextComponents = {
    types: {
      image: ({value}) => <img src={urlFor(value.image?.asset._ref).url()} alt={value.image.asset._ref}/>,
      callToAction: ({value, isInline}) =>
        isInline ? (
          <a href={value.url}>{value.text}</a>
        ) : (
          <div className="callToAction">{value.text}</div>
        ),
    },
  
    marks: {
      link: ({children, value}) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <a href={value.href} rel={rel}>
            {children}
          </a>
        )
      },
    },
  }

  useEffect(() => {
    fetchBlogposts();
  }, []);

  if (currentPost) {
    console.log(urlFor(currentPost.image?.asset._ref).url())
  }

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
        <Stack sx={{ maxWidth: 500, margin: '0 auto'}}>
        <Typography sx={{ textTransform: 'uppercase' }}>What we've been up to lately</Typography>
          <Container>
            <Button>all posts</Button>
          </Container>
          
          <Container sx={{}}>
            {blogposts.map((blogpost) => {
              return (
                <button key={blogpost._id} onClick={() => fetchPost(blogpost._id)}>
                  <Typography>{blogpost.title}</Typography>
                </button>  
              )
            })}
            <PortableText
              value={currentPost?.body}
              components={myPortableTextComponents}
            />
          </Container>
          
        </Stack>
        
        
      </Box>
    </ThemeProvider>
  );
};

export default BlogList;
