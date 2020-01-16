import React, { useContext } from "react";
import PostForm from "./PostForm";
import Header from "./Header";
import { startAddPost } from "../actions/posts";
import PostsContext from "../context/posts-context";

const CreatePost = ({ history }) => {
  const { dispatch } = useContext(PostsContext);
  const createPost = async post => {
    const addPost = await startAddPost(post);
    dispatch(addPost);
    history.push(`/posts/${addPost.post._id}`);
  };
  return (
    <>
      <Header />
      <div>
        <h2>Create a post</h2>
        <PostForm onSubmit={createPost} />
      </div>
    </>
  );
};

export default CreatePost;
