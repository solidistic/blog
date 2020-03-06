import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router";
import PostForm from "./PostForm";
import PostsContext from "../context/posts-context";
import { startEditPost } from "../actions/posts";

const EditPostPage = ({ match, history }) => {
  const { posts, dispatch } = useContext(PostsContext);
  const [post, setPost] = useState(undefined);

  useEffect(() => {
    const postData = posts.find(post => post._id === match.params.id);
    setPost(postData);
  }, [match.params.id, history, posts]);

  const editPost = async updates => {
    dispatch(await startEditPost(match.params.id, updates));
    localStorage.clear();
    history.push(`/posts/${match.params.id}`);
  };

  return (
    <div className="content">
      <div className="content-container input-group">
        <h1 className="content-container__title">Edit Post</h1>
        {post && <PostForm onSubmit={editPost} post={post} />}
      </div>
    </div>
  );
};

export default withRouter(EditPostPage);
