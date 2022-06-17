import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { client, urlFor } from "../../client";

// MUI Imports
import { Button, Container, Stack, Input } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// Component Imports
import PublicHeader from "../../components/public/PublicHeader";
import PostCardLarge from "../../components/public/PostCardLarge";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
// Styling Imports
import styled from "styled-components/macro";
import { darkMode } from "../../styledcomponents/themeoptions";
import {
  BackgroundBox,
  FlexSpaceBetween,
  Grid1Col,
} from "../../styledcomponents/globalstyles";
import { PageTitle, PageSubtitle } from "../../styledcomponents/typography";

const BlogList = () => {
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [blogposts, setBlogposts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchBlogposts = async () => {
    setLoading(true);
    const blogpostQuery = `*[_type == "blogpost" && title match "*${searchTerm}*"] {_id, title, excerpt, image, duration}`;
    const fetch = await client.fetch(blogpostQuery);
    const response = await fetch;
    setBlogposts(response);
    console.log(response);
    setLoading(false);
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
          <Stack maxWidth="md" sx={{ margin: "0 auto" }}>
            <PageTitle component="h1" variant="h2">
              With Purpose Blog
            </PageTitle>
            <PageSubtitle variant="h2" component="h2">
              What we've been up to lately
            </PageSubtitle>
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
              {loading && <LoadingIndicator />}

              <Grid1Col>
                {!loading &&
                  blogposts.map((blogpost) => {
                    return (
                      <PostCardLarge
                        key={blogpost._id}
                        url={urlFor(blogpost.image.asset._ref).url()}
                        duration={blogpost.duration}
                        title={blogpost.title}
                        id={blogpost._id}
                        excerpt={blogpost.excerpt}
                        showBlogpost={showBlogpost}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                      />
                    );
                  })}
              </Grid1Col>
            </PostListContainer>
          </Stack>
          <PageFooter />
        </Container>
        <ScrollToTop />
      </BackgroundBox>
    </ThemeProvider>
  );
};

const PostListContainer = styled(Container)`
  && {
    margin: 0 auto 40px auto;
  }
`;

export default BlogList;
