import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TwitterShareButton,
  FacebookShareButton, 
  LinkedinShareButton
} from 'react-share';
import PublicHeader from "../../components/public/PublicHeader";
import { Box, Button, Container, Stack, Typography, Input } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import styled from 'styled-components/macro';

import { client, urlFor } from "../../client";

import PostCardLarge from "../../components/public/PostCardLarge";

const BlogList = () => {
  // const [loading, setLoading] = useState(true);
  const [blogposts, setBlogposts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  

  const fetchBlogposts = async () => {
    // setLoading(true);
    const blogpostQuery = `*[_type == "blogpost" && title match "*${searchTerm}*"] {_id, title, image, duration}`;
    const fetch = await client.fetch(blogpostQuery);
    const response = await fetch;
    setBlogposts(response);
    console.log(response);
  };


  useEffect(() => {
    fetchBlogposts(); // eslint-disable-next-line 
  }, [searchTerm]);

  const showBlogpost = (id) => {
    navigate(`/blog/${id}`);

  };

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
        <Stack sx={{ maxWidth: '80%', margin: '0 auto'}}>
        <H1 sx={{ textTransform: 'uppercase' }}>What we've been up to lately</H1>
          <PostListContainer>
            <PostNavBar>
              <Button onClick={() => setSearchTerm("")}>all posts</Button>
              <Input
                placeholder="Search blogpost"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </PostNavBar>
            
            <div sx={{width: '100%'}}>
              {blogposts.map((blogpost) => {
                return (
                  <div>
                    <TwitterShareButton url={`https://withpurpose.netlify.app/blog/${blogpost._id}`}>twitter</TwitterShareButton>
                    <FacebookShareButton url={`https://withpurpose.netlify.app/blog/${blogpost._id}`}>fb</FacebookShareButton>
                    <LinkedinShareButton url={`https://withpurpose.netlify.app/blog/${blogpost._id}`}>linkedink</LinkedinShareButton>
                    <StyledContainer disableGutters sx={{margin: '20px 0'}} 
                      onClick={() => showBlogpost(blogpost._id)}
                      key={blogpost._id}
                    >
                      
                      <PostCardLarge
                        url={urlFor(blogpost.image.asset._ref).url()}
                        duration={blogpost.duration}
                        title={blogpost.title}
                      />
                  </StyledContainer>
                  </div>
                  
                )
              })}
            </div>
          </PostListContainer>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};


const H1 = styled(Typography)`
  &&{
    font-size: 4rem;
    font-weight: 900;
    font-style: italic;
    text-align: center;
  }
`;

const StyledContainer = styled(Container)`
  padding: 0;
`

const PostListContainer = styled(Container)`
  &&{
    margin: 0 auto;
  }
`;

const PostNavBar = styled.div`
  display: flex;
  justify-content: space-between;
`

export default BlogList;
