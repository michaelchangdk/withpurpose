import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { Box, Stack, Typography, Button, Link, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import styled from "styled-components/macro";
import { darkMode, lightMode } from "../../styledcomponents/themeoptions";
import { client, urlFor } from "../../client";

import PublicHeader from "../../components/public/PublicHeader";
import PostCardSmall from "../../components/public/PostCardSmall";
import SharingModal from "../../components/public/SharingModal";
import PageFooter from "../../components/public/PageFooter";
import ScrollToTop from "../ScrollToTop";

import { BackgroundBox } from "../../styledcomponents/globalstyles";

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
    console.log(response[0]);
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

  const myPortableTextComponents = {
    types: {
      image: ({ value }) => (
        <InlineImg
          src={urlFor(value.asset._ref).url()}
          alt={value.asset._ref}
        />
      ),
      callToAction: ({ value, isInline }) =>
        isInline ? (
          <a href={value.url}>{value.text}</a>
        ) : (
          <div className="callToAction">{value.text}</div>
        ),
    },
    block: {
      blockquote: ({ children }) => (
        <blockquote style={{ fontSize: "18px" }}>{children}</blockquote>
      ),
    },

    marks: {
      link: ({ children, value }) => {
        const rel = !value.href.startsWith("/")
          ? "noreferrer noopener"
          : undefined;
        return (
          <a
            href={value.href}
            rel={rel}
            style={{ color: "#000", textDecoration: "underline" }}
          >
            {children}
          </a>
        );
      },
    },
  };
  return (
    <ThemeProvider theme={darkMode}>
      <BackgroundBox
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Container maxWidth="lg">
          <Stack sx={{ maxWidth: "75%", margin: "0 auto" }}>
            <PublicHeader />
            <ThemeProvider theme={lightMode}>
              <Box
                sx={{
                  bgcolor: "background.default",
                  color: "text.primary",
                  width: "100%",
                  minHeight: "100vh",
                  height: "100%",
                  lineHeight: "25px",
                }}
              >
                <div
                  style={{
                    margin: "20px",
                    padding: "min(10%, 100px)",
                    border: "1px solid lightgray",
                  }}
                >
                  <TopRow>
                    <Duration>{currentPost?.duration}</Duration>
                    <SharingModal
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      id={id}
                    />
                    <Ellipsis onClick={() => setOpenModal(true)}>⋮</Ellipsis>
                  </TopRow>
                  <PortableText
                    value={currentPost?.body}
                    components={myPortableTextComponents}
                  />
                </div>
                <GridDiv>
                  {recentPosts &&
                    recentPosts.map((post) => {
                      return (
                        <Link
                          key={post._id}
                          disableGutters
                          onClick={() => navigate(`/blog/${post._id}`)}
                          style={{
                            margin: "20px",
                            border: "1px solid lightgray",
                            textDecoration: "none",
                            color: "hsl(0, 0%, 20%",
                          }}
                        >
                          <PostCardSmall
                            url={urlFor(post.image.asset._ref).url()}
                            title={post.title}
                          />
                        </Link>
                      );
                    })}
                </GridDiv>
              </Box>
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

const InlineImg = styled.img`
  width: 100%;
`;

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const Duration = styled(Typography)`
  && {
    font-size: 1rem;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const Ellipsis = styled(Button)`
  && {
    font-size: 1.25rem;
    font-weight: bold;
    display: flex;
    justify-content: flex-end;
  }
`;

export default BlogPost;
