import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { Stack, Link, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode, lightMode } from "../../styledcomponents/themeoptions";
import { client, urlFor } from "../../client";

import PublicHeader from "../../components/public/PublicHeader";
import PostCardSmall from "../../components/public/PostCardSmall";
import SharingModal from "../../components/public/SharingModal";
import PageFooter from "../../components/public/PageFooter";
import ScrollToTop from "../ScrollToTop";

import { BackgroundBox, ThreeGrid, FlexSpaceBetween } from "../../styledcomponents/globalstyles";
import { Ellipsis } from "../../styledcomponents/buttons";
import { Duration } from "../../styledcomponents/typography";

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
    const blogpostQuery = `*[_type == "blogpost"] {_id, title, image}`;
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
        <Container maxWidth="lg">
          <Stack sx={{margin: "0 auto" }}>
            <PublicHeader />
            <ThemeProvider theme={lightMode}>
              <BackgroundBox
                sx={{
                  bgcolor: "background.default",
                  color: "text.primary",
                  lineHeight: "25px",
                }}
              >
                <div
                  style={{
                    margin: "20px",
                    padding: "min(10%, 100px)"
                  }}
                >
                  <FlexSpaceBetween>
                    <Duration>{currentPost?.duration}</Duration>
                    <SharingModal
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      id={id}
                    />
                    <Ellipsis onClick={() => setOpenModal(true)}>⋮</Ellipsis>
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
                            margin: 32,
                            border: "1px solid lightgray",
                            textDecoration: "none",
                            color: "hsl(0, 0%, 20%)",
                          }}
                        >
                          <PostCardSmall
                            url={urlFor(post.image.asset._ref).url()}
                            title={post.title}
                          />
                        </Link>
                      );
                    })}
                </ThreeGrid>
              </BackgroundBox>
            </ThemeProvider>
          </Stack>
          <Stack sx={{ margin: "3rem auto" }}>
            <PageFooter />
          </Stack>
        </Container>
        <ScrollToTop />
      </BackgroundBox>
    </ThemeProvider>
  );
};

export default BlogPost;
