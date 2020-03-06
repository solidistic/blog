import React, { useContext, useState } from "react";
import PostForm from "./PostForm";
import { startAddPost } from "../actions/posts";
import PostsContext from "../context/posts-context";

const CreatePost = ({ history }) => {
  const { dispatch } = useContext(PostsContext);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const createPost = post => {
    setButtonDisabled(true);
    startAddPost(post)
      .then(addPost => {
        if (!addPost && addPost.res.status !== 200) throw new Error();
        console.log("ADDPOST createpost", addPost);
        return addPost;
      })
      .then(addPost => {
        dispatch(addPost);
        localStorage.clear();
        history.push(`/posts/${addPost.post._id}`);
      })
      .catch(e => {
        setError("Unable to create a new post, please try again.");
        setButtonDisabled(false);
      });
  };

  return (
    <div className="content">
      <div className="content-container input-group">
        <h2>Create a post</h2>
        {error && <p>{error}</p>}
        <PostForm onSubmit={createPost} active={buttonDisabled} />
      </div>
    </div>
  );
};

export default CreatePost;
