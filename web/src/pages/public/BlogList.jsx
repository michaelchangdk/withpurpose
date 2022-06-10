import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   TwitterShareButton,
//   FacebookShareButton, 
//   LinkedinShareButton
// } from 'react-share';
import PublicHeader from "../../components/public/PublicHeader";
import { Box, Button, Container, Stack, Typography, Input } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import styled from 'styled-components/macro';

import { client, urlFor } from "../../client";

import PostCardLarge from "../../components/public/PostCardLarge";
import PageFooter from "../../components/public/PageFooter";

const BlogList = () => {
  // const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
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
        <H1>What we've been up to lately</H1>
          <PostListContainer>
            <PostNavBar>
              <Button sx={{color: "#fff"}} onClick={() => setSearchTerm("")}>all posts</Button>
              <Input
                placeholder="Search blogpost"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </PostNavBar>
            
            <div sx={{width: '100%'}}>
              {blogposts.map((blogpost) => {
                return (
                  <div key={blogpost._id}>
                    <StyledContainer disableGutters sx={{margin: '20px 0'}} >
                      <PostCardLarge
                        url={urlFor(blogpost.image.asset._ref).url()}
                        duration={blogpost.duration}
                        title={blogpost.title}
                        id={blogpost._id}
                        showBlogpost={showBlogpost}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                      />
                  </StyledContainer>
                  </div>
                )
              })}
            </div>
          </PostListContainer>
        </Stack>
        <Stack  sx={{margin: '3rem auto'}}>
          <PageFooter/>
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
    text-transform: uppercase;
  }
`;

const StyledContainer = styled(Container)`
  z-index: -1;
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
