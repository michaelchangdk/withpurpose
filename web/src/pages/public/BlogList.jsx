import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "../../components/public/PublicHeader";
import { Button, Container, Stack, Input, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import styled from "styled-components/macro";
import SharingModal from "../../components/public/SharingModal";
// import {Helmet} from 'react-helmet';

import { client, urlFor } from "../../client";

import PostCardLarge from "../../components/public/PostCardLarge";
import PageFooter from "../../components/public/PageFooter";
import {
  BackgroundBox,
  FlexSpaceBetween,
  Grid1Col,
} from "../../styledcomponents/globalstyles";

const BlogList = () => {
  // const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [blogposts, setBlogposts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [holdArgs, setHoldArgs] = useState({});
  const navigate = useNavigate();

  const fetchBlogposts = async () => {
    // setLoading(true);
    const blogpostQuery = `*[_type == "blogpost" && title match "*${searchTerm}*"] {_id, title, excerpt, image, duration}`;
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

  const Share = () => {
    const {id, title, excerpt, url} = holdArgs;
    return(
      <SharingModal openModal={openModal} setOpenModal={setOpenModal} handleOpenModal={handleOpenModal} id={id} title={title} excerpt={excerpt} image={url}/>
    )
  }

  const handleOpenModal = (id, title, excerpt, url) => {
    setHoldArgs({title: title, id: id, excerpt: excerpt, url: url});
    setOpenModal(true);
  };

  return (
    <div>
    {/* <Helmet>
              <title>With Purpose - Accelerating Women Entrepreneurs in the Nordics
              </title>
            </Helmet> */}
        <ThemeProvider theme={darkMode}>
      <BackgroundBox
        sx={{ bgcolor: "background.default", color: "text.primary" }}
      >
        {/* <Helmet>
          <title>With Purpose - Accelerating Women Entrepreneurs in the Nordics
          </title>
        </Helmet> */}
        <PublicHeader />
        <Container maxWidth="lg">
          <Stack maxWidth="md" sx={{ margin: "0 auto" }}>
            <PageHeader variant="h2" component="h1" textAlign="center">
              What we've been up to lately
            </PageHeader>
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
              {openModal && Share()}
              <Grid1Col>
                {blogposts.map((blogpost) => {
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
                        handleOpenModal={handleOpenModal}
                      />
                    
                  );
                })}
              </Grid1Col>
            </PostListContainer>
          </Stack>
          <PageFooter />
        </Container>
      </BackgroundBox>
    </ThemeProvider>
    </div>
    
  );
};

const PageHeader = styled(Typography)`
  && {
    font-size: 40px;
    margin-bottom: 40px;
  }
  @media (min-width: 768px) {
    && {
      font-size: 60px;
      padding: 0 60px;
      margin: 0 auto 60px auto;
    }
  }
`;

const PostListContainer = styled(Container)`
  && {
    margin: 0 auto 40px auto;
  }
`;

export default BlogList;
