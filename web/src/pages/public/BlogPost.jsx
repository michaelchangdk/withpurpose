import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client, urlFor } from "../../client";
import { PortableText } from "@portabletext/react";
import myPortableTextComponents from "../../services/myPortableTextComponents";

// MUI Imports
import { Link, Container, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// Component Imports
import PublicHeader from "../../components/public/PublicHeader";
import PostCardSmall from "../../components/public/PostCardSmall";
import SharingModal from "../../components/public/SharingModal";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import { darkMode, lightMode } from "../../styledcomponents/themeoptions";
import {
  BackgroundBox,
  ThreeGrid,
  FlexSpaceBetween,
} from "../../styledcomponents/globalstyles";
import { Ellipsis } from "../../styledcomponents/buttons";
import { Duration } from "../../styledcomponents/typography";

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
          <PublicHeader />
          <Container maxWidth="lg">
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
                            margin: 32,
                            textDecoration: "none",
                            color: "hsl(0, 0%, 20%)",
                            display: "flex",
                            justifyContent: "center",
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
          </Container>
        </Container>
        <PageFooter />
        <ScrollToTop />
      </BackgroundBox>
    </ThemeProvider>
  );
};

export default BlogPost;
