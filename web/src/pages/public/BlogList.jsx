import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "../../components/public/PublicHeader";
import { Button, Container, Stack, Typography, Input } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import styled from "styled-components/macro";

import { client, urlFor } from "../../client";

import PostCardLarge from "../../components/public/PostCardLarge";
import PageFooter from "../../components/public/PageFooter";
import { BackgroundBox, FlexSpaceBetween, Grid1Col } from "../../styledcomponents/globalstyles";
import { H1 } from "../../styledcomponents/typography";

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
      <BackgroundBox
        sx={{ bgcolor: "background.default", color: "text.primary" }}
      >
        <PublicHeader />
        <Container maxWidth="lg">
          <Stack sx={{ maxWidth: "80%", margin: "0 auto" }}>
            <H1>What we've been up to lately</H1>
            <PostListContainer>
              <FlexSpaceBetween>
                <Button
                  sx={{ color: "#fff" }}
                  onClick={() => setSearchTerm("")}
                >
                  all posts
                </Button>
                <Input
                  placeholder="Search blogpost"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </FlexSpaceBetween>

              <Grid1Col>
                {blogposts.map((blogpost) => {
                  return (
                    <div key={blogpost._id}>
                      <PostCardLarge
                        url={urlFor(blogpost.image.asset._ref).url()}
                        duration={blogpost.duration}
                        title={blogpost.title}
                        id={blogpost._id}
                        showBlogpost={showBlogpost}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                      />
                    </div>
                  );
                })}
              </Grid1Col>
            </PostListContainer>
          </Stack>
          <Stack sx={{ margin: "3rem auto" }}>
            <PageFooter />
          </Stack>
        </Container>
      </BackgroundBox>
    </ThemeProvider>
  );
};



const PostListContainer = styled(Container)`
  && {
    margin: 0 auto;
  }
`;

export default BlogList;
