import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Post from "./Post";
import PostsContext from "../context/posts-context";
import UserContext from "../context/user-context";
import CommentList from "./CommentsList";
import CommentForm from "./CommentForm";
import LoadingPage from "./LoadingPage";
import Modal from "./Modal";
import Hero from "./Hero";
import { startRemovePost } from "../actions/posts";

const ReadPostPage = ({ match, history }) => {
  const { posts, dispatch } = useContext(PostsContext);
  const { user } = useContext(UserContext);
  const [post, setPost] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalActive, setModalActive] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    const postData = posts.find(post => post._id === match.params.id);
    setPost(postData);
    if (postData) setIsLoaded(true);
  }, [match.params.id, posts, post]);

  const handleRemove = async confirmRemoval => {
    if (confirmRemoval) {
      dispatch(await startRemovePost(post));
      history.push("/account");
    } else {
      setModalActive(false);
    }
  };

  if (!isLoaded) return <LoadingPage />;
  return (
    <>
      <Hero post={post} />
      <div className="content">
        <div className="content-container">
          <Modal confirmAction={handleRemove} active={isModalActive}>
            <h2>Delete post "{post.title}"?</h2>
            <button
              className="button button--delete"
              onClick={() => handleRemove(true)}
            >
              <i className="fas fa-check"></i> Yes
            </button>
            <button className="button" onClick={() => handleRemove(false)}>
              <i className="fas fa-times"></i> No
            </button>
          </Modal>
          <Post post={post} />
          {user && user._id === post.author._id && (
            <div className="content-container__edit">
              <Link className="button" to={`/edit/${post._id}`}>
                <i className="fas fa-edit"></i> Edit post
              </Link>
              <button
                className="button button--delete"
                onClick={() => setModalActive(!isModalActive)}
              >
                <i className="fas fa-trash-alt"></i> Delete post
              </button>
            </div>
          )}
          <div className="comments">
            <h2 className="content-container__subtitle">Comments:</h2>
            {post && (
              <CommentList
                comments={post.comments}
                postId={post._id}
                user={user}
              />
            )}
            {user && <CommentForm id={post._id} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ReadPostPage);
