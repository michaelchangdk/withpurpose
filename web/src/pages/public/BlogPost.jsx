import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client, urlFor } from "../../client";
import { PortableText } from "@portabletext/react";

// MUI Imports
import { Container, Button, Typography, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// Component Imports
import PublicHeader from "../../components/public/PublicHeader";
import PostCardSmall from "../../components/public/PostCardSmall";
import SharingModal from "../../components/public/SharingModal";
import PageFooter from "../../components/global/PageFooter";
import ScrollToTop from "../../components/global/ScrollToTop";
import myPortableTextComponents from "../../styledcomponents/myPortableTextComponents";
import HelmetMetaData from "../../components/public/HelmetMetaData";
// import PostCardLarge from "../../components/public/PostCardLarge";

// Styling Imports
import styled from "styled-components/macro";
import { Ellipsis } from "../../styledcomponents/buttons";
import { Duration } from "../../styledcomponents/typography";
import { darkMode, lightMode } from "../../styledcomponents/themeoptions";

import {
  BackgroundBox,
  ThreeGrid,
  FlexSpaceBetween,
} from "../../styledcomponents/globalstyles";

const {format} = require('date-fns');
//today's date
const today =format(new Date(),'dd MM');
console.log(today);

const BlogPost = () => {
  const { id } = useParams();
  const [recentPosts, setRecentPosts] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [body, setBody] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [duration, setDuration] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [authorName, setAuthorName] = useState("");
  // const [authorImageUrl, setAuthorImageUrl] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const navigate = useNavigate();

  const fetchPost = async (postId) => {
    const postQuery = `*[_type == "blogpost" && _id == '${postId}'] {body, image, title, excerpt, duration, publishedAt, hashtags->[], author->{image, name}}`;
    const fetch = await client.fetch(postQuery);
    const response = await fetch;
    
    setBody(response[0].body);
    setImageUrl(urlFor(response?.[0].image.asset._ref).url());
    setTitle(response[0].title);
    setExcerpt(response[0].excerpt);
    setDuration(response[0].duration);
    setHashtags(response[0].hashtags);
    setAuthorName(response[0].author?.name);
    // setAuthorImageUrl(urlFor(response[0].author?.image?.asset._ref).url());
    setPublishedAt(format(new Date(response[0].publishedAt), "MMM d"));
    // console.log(response[0])
  };

  const fetchBlogposts = async () => {
    const blogpostQuery = `*[_type == "blogpost"] {_id, title, image, duration, excerpt, hashtags}`;
    const fetch = await client.fetch(blogpostQuery);
    const response = await fetch;
    setRecentPosts(response.slice(0, 3));

  };

  useEffect(() => {
    fetchPost(id);
    fetchBlogposts(); // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <HelmetMetaData 
        url={`https://withpurpose.netlify.app/blog/${id}`}
        image={imageUrl}
        title={title}
        excerpt={excerpt}
        hashtags={hashtags ? hashtags : ["WithPurpose"]}
      />
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
                    <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
                      {authorName && 
                        <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                          {/* {authorImageUrl &&  */}
                          {/* <img style={{borderRadius: "50%", height: "100px", maxWidth: "100px"}} src={authorImageUrl}/>*/}
                          <Typography component="h2" variant="h5">{authorName}</Typography>
                          <div style={{display: "flex"}} >
                            <Duration>{duration} read</Duration>
                            <Typography component="h3" varient="h6">{publishedAt}</Typography>
                            
                          </div>  
                        </Stack>
                      }
                      
                    </div>

                     
                      {openModal && (
                        <SharingModal
                          openModal={openModal}
                          setOpenModal={setOpenModal}
                          id={id}
                          title={title}
                          excerpt={excerpt}
                          image={imageUrl}
                          hashtags={hashtags ? hashtags : ["WithPurpose"]}
                        />
                      )}
                      <Ellipsis
                        sx={{ color: "text.primary" }}
                        onClick={() => setOpenModal(true)}
                      >
                        ⋮
                      </Ellipsis>
                    </FlexSpaceBetween>
                    {/* <PortableText
                      value={body?.[0]}
                      components={myPortableTextComponents}
                    /> */}
                    <Typography component="h1" variant="h3" sx={{lineHeight: .9}}>{title}</Typography>
                    <PortableText
                      value={body}
                      components={myPortableTextComponents}
                    />
                  </BlogPostContainer>
                </BackgroundBox>
                <PostDivider>
                  <Typography variant="h4" sx={{ fontSize: "18px" }}>
                    Recent posts
                  </Typography>
                  <Button variant="outlined" onClick={() => navigate("/blog")}>
                    See all
                  </Button>
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
