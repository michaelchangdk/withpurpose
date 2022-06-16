import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { Stack, Link, Container, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode, lightMode } from "../../styledcomponents/themeoptions";
import { client, urlFor } from "../../client";

import PublicHeader from "../../components/public/PublicHeader";
// import PostCardSmall from "../../components/public/PostCardSmall";
import SharingModal from "../../components/public/SharingModal";
import PageFooter from "../../components/public/PageFooter";
import ScrollToTop from "../ScrollToTop";

import PostCardLarge from "../../components/public/PostCardLarge";

import {
  BackgroundBox,
  ThreeGrid,
  FlexSpaceBetween,
} from "../../styledcomponents/globalstyles";
import { Ellipsis } from "../../styledcomponents/buttons";
import { Duration } from "../../styledcomponents/typography";
import styled from "styled-components/macro";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import myPortableTextComponents from "../../services/myPortableTextComponents";

const BlogPost = () => {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async (postId) => {
    const postQuery = `*[_type == "blogpost" && _id == '${postId}']`;
    const fetch = await client.fetch(postQuery);
    const response = await fetch;
    setCurrentPost(response[0]);
  };

  const fetchBlogposts = async () => {
    // setLoading(true);
    const blogpostQuery = `*[_type == "blogpost"] {_id, title, image, duration, excerpt}`;
    const fetch = await client.fetch(blogpostQuery);
    const response = await fetch;
    setRecentPosts(response.slice(0, 3));
  };

  useEffect(() => {
    fetchPost(id);
    fetchBlogposts();
  }, [id]);

  return (
    <ThemeProvider theme={darkMode}>
      <BackgroundBox
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <BlogPostContainer maxWidth="lg">
          <PublicHeader />
          <Button
            variant="contained"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate("/blog")}
            sx={{ marginBottom: "20px" }}
          >
            Back
          </Button>
          <Stack maxWidth="md" sx={{ margin: "0 auto" }}>
            <ThemeProvider theme={lightMode}>
              <BackgroundBox
                sx={{
                  bgcolor: "background.default",
                  color: "text.primary",
                  lineHeight: "25px",
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    margin: "20px",
                    padding: "min(10%, 50px)",
                  }}
                >
                  <FlexSpaceBetween>
                    <Duration>{currentPost?.duration} read</Duration>
                    <SharingModal
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      id={id}
                      excerpt={currentPost?.excerpt}
                    />
                    <Ellipsis
                      sx={{ color: "text.primary" }}
                      onClick={() => setOpenModal(true)}
                    >
                      ⋮
                    </Ellipsis>
                  </FlexSpaceBetween>
                  <PortableText
                    value={currentPost?.body}
                    components={myPortableTextComponents}
                  />
                </div>
                <ThreeGrid>
                  {recentPosts &&
                    recentPosts.map((post) => {
                      return (
                        <Link
                          key={post._id}
                          onClick={() => navigate(`/blog/${post._id}`)}
                          style={{
                            margin: 16,
                            textDecoration: "none",
                            color: "hsl(0, 0%, 20%)",
                            display: "flex",
                            justifyContent: "center"
                          }}
                        >
                          {/* <PostCardSmall
                            url={urlFor(post.image.asset._ref).url()}
                            title={post.title}
                          /> */}
                          <PostCardLarge 
                            duration={post.duration}
                            title={post.title}
                            url={urlFor(post.image.asset._ref).url()}
                            id={post._id}
                            excerpt={post.excerpt}
                            />
                        </Link>
                      );
                    })}
                </ThreeGrid>
              </BackgroundBox>
            </ThemeProvider>
          </Stack>
        </BlogPostContainer>
        <PageFooter />
        <ScrollToTop />
      </BackgroundBox>
    </ThemeProvider>
  );
};

export default BlogPost;

const BlogPostContainer = styled(Container)`
  && {
    margin: 0 auto 40px auto;
  }
`;
