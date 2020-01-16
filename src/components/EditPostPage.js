import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router";
import PostForm from "./PostForm";
import Header from "./Header";
import PostsContext from "../context/posts-context";
import { startEditPost, startRemovePost } from "../actions/posts";

const EditPostPage = ({ match, history }) => {
  const { posts, dispatch } = useContext(PostsContext);
  const [post, setPost] = useState({});

  useEffect(() => {
    const postData = posts.find(post => post._id === match.params.id);
    // if(!postData) history.push("/");
    setPost(postData);
  }, [match.params.id, history, posts]);

  const editPost = async updates => {
    dispatch(await startEditPost(match.params.id, updates));
    history.push(`/posts/${match.params.id}`);
  };

  const handleRemove = async () => {
    dispatch(await startRemovePost(post));
    history.push("/");
  };

  return (
    <div>
      <Header />
      <PostForm onSubmit={editPost} post={post} />
      <button onClick={handleRemove}>Delete post</button>
    </div>
  );
};

export default withRouter(EditPostPage);
