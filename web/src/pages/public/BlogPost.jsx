import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {PortableText} from '@portabletext/react';
import { client, urlFor } from "../../client";

const BlogPost = () => {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState(null);

  const fetchPost = async (id) => {
    const postQuery = `*[_type == "blogpost" && _id == '${id}']`;
    const fetch = await client.fetch(postQuery);
    const response = await fetch;
    setCurrentPost(response[0]);
  };

  useEffect(() => {
    fetchPost(id);
  }, [])


  return (
    <PortableText
      value={currentPost?.body}
    />
    );
};

export default BlogPost;
