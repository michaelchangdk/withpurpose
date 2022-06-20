import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client, urlFor } from "../../client";
import { Helmet } from "react-helmet";
import { PortableText } from "@portabletext/react";

// MUI Imports
import { Container, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// Component Imports
import PublicHeader from "../../components/public/PublicHeader";
import PostCardSmall from "../../components/public/PostCardSmall";
import SharingModal from "../../components/public/SharingModal";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
import myPortableTextComponents from "../../services/myPortableTextComponents";
// import HelmetMetaData from "../../components/public/HelmetMetaData";
// import PostCardLarge from "../../components/public/PostCardLarge";

// Styling Imports
import styled from "styled-components/macro";
import { Ellipsis } from "../../styledcomponents/buttons";
import { Duration } from "../../styledcomponents/typography";
import { darkMode, lightMode } from "../../styledcomponents/themeoptions";
// import styled from "styled-components/macro";

import {
  BackgroundBox,
  ThreeGrid,
  FlexSpaceBetween,
} from "../../styledcomponents/globalstyles";

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
    <>
      <Helmet>
        <title>{currentPost?.title}</title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="csrf_token" content="" />
        <meta property="type" content="website" />
        <meta
          property="url"
          content={`https://withpurpose.netlify.app/blog/${id}`}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="_token" content="" />
        <meta name="robots" content="noodp" />
        <meta property="title" content={currentPost?.title} />
        <meta property="quote" content={currentPost?.excerpt} />
        <meta name="description" content={currentPost?.excerpt} />
        <meta property="image" content={currentPost?.image} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={currentPost?.title} />
        <meta property="og:quote" content={currentPost?.excerpt} />
        <meta property="og:hashtag" content={"#WithPurpose"} />
        <meta property="og:image" content={currentPost?.image} />
        <meta content="image/*" property="og:image:type" />
        <meta
          property="og:url"
          content={`https://withpurpose.netlify.app/blog/${currentPost?._id}`}
        />
        <meta property="og:site_name" content="With Purpose" />
        <meta property="og:description" content={currentPost?.excerpt} />
      </Helmet>
      <ThemeProvider theme={darkMode}>
        <BackgroundBox
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <Container maxWidth="lg">
            <PublicHeader />
            <Container maxWidth="md" sx={{ margin: "0 auto" }}>
              <Button
                variant="contained"
                startIcon={<ArrowBackRoundedIcon />}
                onClick={() => navigate("/blog")}
                sx={{ marginBottom: "20px" }}
              >
                Back
              </Button>
            </Container>
            <Container maxWidth="md" sx={{ margin: "0 auto" }}>
              <ThemeProvider theme={lightMode}>
                <BackgroundBox
                  sx={{
                    bgcolor: "background.default",
                    color: "text.primary",
                    lineHeight: "25px",
                    borderRadius: "4px",
                  }}
                >
                  <BlogPostContainer>
                    <FlexSpaceBetween>
                      <Duration>{currentPost?.duration} read</Duration>
                      {openModal && (
                        <SharingModal
                          openModal={openModal}
                          setOpenModal={setOpenModal}
                          id={id}
                          title={currentPost?.title}
                          excerpt={currentPost?.excerpt}
                          image={currentPost?.image}
                        />
                      )}
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
                  </BlogPostContainer>
                </BackgroundBox>
                <PostDivider>
                  <Typography variant="h4" sx={{ fontSize: "18px" }}>
                    Recent posts
                  </Typography>
                  <Button>See all</Button>
                </PostDivider>

                <ThreeGrid style={{ gap: "16px" }}>
                  {recentPosts &&
                    recentPosts.map((post) => {
                      return (
                        <PostCardSmall
                          key={post._id}
                          url={urlFor(post.image.asset._ref).url()}
                          title={post.title}
                          duration={post.duration}
                          excerpt={post.excerpt}
                          link={`/blog/${post._id}`}
                        />
                      );
                    })}
                </ThreeGrid>
              </ThemeProvider>
            </Container>
            <PageFooter />
            <ScrollToTop />
          </Container>
        </BackgroundBox>
      </ThemeProvider>
    </>
  );
};

export default BlogPost;

const BlogPostContainer = styled.div`
  padding: 16px;

  @media (min-width: 768px) {
    padding: 32px;
  }

  @media (min-width: 1100px) {
    padding: 48px;
  }
`;

const PostDivider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
`;
