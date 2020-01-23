import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import { withRouter } from "react-router";
import PostsContext from "../context/posts-context";
import UserContext from "../context/user-context";
import CommentList from "./CommentsList";
import CommentForm from "./CommentForm";

const ReadPostPage = ({ match, history }) => {
  const { posts } = useContext(PostsContext);
  const { user } = useContext(UserContext);
  const [post, setPost] = useState({});

  useEffect(() => {
    const postData = posts.find(post => post._id === match.params.id);
    if (!postData) history.push("/");
    setPost(postData);
  }, [match.params.id, history, posts]);

  return (
    <>
      <Post post={post} />
      {user && <Link to={`/edit/${post._id}`}>Edit post</Link>}
      <h2>Comments:</h2>
      <CommentList comments={post.comments} />
      <CommentForm id={post._id} />
    </>
  );
};

export default withRouter(ReadPostPage);
