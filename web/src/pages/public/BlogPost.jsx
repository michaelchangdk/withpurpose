import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {PortableText} from '@portabletext/react';
import { Box, Stack, Typography, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import styled from 'styled-components/macro';
import { darkMode, lightMode } from "../../styledcomponents/themeoptions";
import { client, urlFor } from "../../client";

import PublicHeader from "../../components/public/PublicHeader";

const BlogPost = () => {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState(null);

  const fetchPost = async () => {
    const postQuery = `*[_type == "blogpost" && _id == '${id}']`;
    const fetch = await client.fetch(postQuery);
    const response = await fetch;
    setCurrentPost(response[0]);
    console.log(response[0])
  };

  useEffect(() => {
    fetchPost();
  }, []);

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
      block: {
        blockquote: ({children}) => <blockquote style={{fontSize: '18px'}}>{children}</blockquote>
      },
        
      marks: {
        link: ({children, value}) => {
          const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
          return (
            <a href={value.href} rel={rel} style={{color: "#000", fontWeight: "bold"}}>
              {children}
            </a>
          )
        },
      },
    }


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
        <Stack sx={{ maxWidth: '75%', margin: '0 auto'}}>
          <PublicHeader />
          <ThemeProvider theme={lightMode}>
          <Box
            sx={{
              bgcolor: "background.default",
              color: "text.primary",
              width: "100%",
              minHeight: "100vh",
              height: "100%",
              lineHeight: "25px"
            }}
          >
            
            <div style={{margin: "20px", padding: "min(10%, 100px)", border: "1px solid lightgray"}}>
              <TopRow>
                <Duration>{currentPost?.duration}</Duration>
                <Ellipsis>
                    ⋮
                </Ellipsis>
              </TopRow>
              <PortableText
                value={currentPost?.body}
                components={myPortableTextComponents}
              />
            </div>
            </Box>
          </ThemeProvider>
          
        </Stack>
      </Box>
    </ThemeProvider>
    
    );
};

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const Duration = styled(Typography)`
  &&{
    font-size: 1rem;
    font-weight: 300;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const Ellipsis = styled(Button)`
  &&{
    font-size: 1.25rem;
    font-weight: bold;
    display: flex;
    justify-content: flex-end;
  }
`;

export default BlogPost;
