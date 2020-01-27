import React, { useContext, useState } from "react";
import PostForm from "./PostForm";
import { startAddPost } from "../actions/posts";
import PostsContext from "../context/posts-context";

const CreatePost = ({ history }) => {
  const { dispatch } = useContext(PostsContext);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonActivity] = useState(false);

  const createPost = post => {
    setButtonActivity(true);
    startAddPost(post)
      .then(addPost => {
        console.log("ADDPOST createpost", addPost);
        return addPost;
      })
      .then(addPost => {
        dispatch(addPost);
        // await setButtonActivity(false);
        history.push(`/posts/${addPost.post._id}`);
      })
      .catch(e => {
        console.log(e);
        setError("Unable to create a new post, please try again.");
        setButtonActivity(false);
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
