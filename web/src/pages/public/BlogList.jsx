import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "../../components/public/PublicHeader";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkMode } from "../../styledcomponents/themeoptions";
import styled from 'styled-components/macro';

import { client, urlFor } from "../../client";




const BlogList = ({ navigation }) => {
  // const [loading, setLoading] = useState(true);
  const [blogposts, setBlogposts] = useState([]);
  const navigate = useNavigate();
  

  const fetchBlogposts = async () => {
    // setLoading(true);
    const blogpostQuery = `*[_type == "blogpost"] {_id, title, image, duration}`;
    const fetch = await client.fetch(blogpostQuery);
    const response = await fetch;
    setBlogposts(response);
    console.log(response);
    // console.log(response[0])
    // setLoading(false);
  };

  // const fetchPost = async (id) => {
  //   const postQuery = `*[_type == "blogpost" && _id == '${id}']`;
  //   const fetch = await client.fetch(postQuery);
  //   const response = await fetch;
  //   setCurrentPost(response[0]);
  // };

  const myPortableTextComponents = {
    types: {
      image: ({value}) => <img src={urlFor(value.image?.asset._ref).url()} alt={value.image.asset._ref}/>,
      callToAction: ({value, isInline}) =>
        isInline ? (
          <a href={value.url}>{value.text}</a>
        ) : (
          <div className="callToAction">{value.text}</div>
        ),
    },
  
    marks: {
      link: ({children, value}) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <a href={value.href} rel={rel}>
            {children}
          </a>
        )
      },
    },
  }

  useEffect(() => {
    fetchBlogposts();
  }, []);

  const showBlogpost = (id) => {
    navigate(`/blog/${id}`);

    // navigation.navigate('/blog/:id', { id: id});
  };

  // if (currentPost) {
  //   console.log(urlFor(currentPost.image?.asset._ref).url())
  // }

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
        <H1 sx={{ textTransform: 'uppercase' }}>What we've been up to lately</H1>
          <PostListContainer>
            <Button>all posts</Button>
            <Container sx={{width: '100%'}}>
              {blogposts.map((blogpost) => {
                return (
                  <PostThumbnail key={blogpost._id} onClick={() => showBlogpost(blogpost._id)}>
                    {/* {blogpost.image && <ThumbnailImage src={urlFor(blogpost.image.asset._ref).url()} alt={blogpost.image?.asset._ref}/>} */}
                    <div>
                      <ThumbnailImage url={urlFor(blogpost.image.asset._ref).url()}></ThumbnailImage>
                    </div>
                    <div>
                      <TopRow>
                        <Duration>{blogpost.duration}</Duration>
                        <Ellipsis>
                          ⋮
                        </Ellipsis>
                      </TopRow>
                      <PostTitle>{blogpost.title}</PostTitle>
                    </div>
                  </PostThumbnail>  
                )
              })}
              {/* <PortableText
                value={currentPost?.body}
                components={myPortableTextComponents}
              /> */}
            </Container>
          </PostListContainer>
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
  }
`;

const PostTitle = styled(Typography)`
  &&{
    font-size: 2rem;
    font-weight: 700;
  }
`;

const Duration = styled(Typography)`
  &&{
    font-size: .725rem;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const Ellipsis = styled(Button)`
  &&{
    color: white;
    font-size: 1rem;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const PostListContainer = styled(Container)`
  &&{
    margin: 0 auto;
  }
`;

const PostThumbnail = styled(Container)`
  &&{
    padding: 1rem 0;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const ThumbnailImage = styled.div`
  background-image: url('${props => props.url}');
  width: 100%;
  height: 100%;
  min-height: 200px;
  background-size: cover;
`;


export default BlogList;
