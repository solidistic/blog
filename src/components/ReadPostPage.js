import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import Header from "./Header";
import { withRouter } from "react-router";
import PostsContext from "../context/posts-context";

const ReadPostPage = ({ match, history }) => {
  const { posts } = useContext(PostsContext);
  const [post, setPost] = useState({});

  useEffect(() => {
    const postData = posts.find(post => post._id === match.params.id);
    // if (!postData) history.push("/");
    setPost(postData);
  }, [match.params.id, history, posts]);

  return (
    <>
      <Header />
      <Post post={post} />
      <Link to={`/edit/${post._id}`}>Edit post</Link>
    </>
  );
};

export default withRouter(ReadPostPage);
