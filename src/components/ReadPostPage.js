import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import { withRouter } from "react-router";
import PostsContext from "../context/posts-context";
import UserContext from "../context/user-context";
import CommentList from "./CommentsList";
import CommentForm from "./CommentForm";
import LoadingPage from "./LoadingPage";
import { startRemovePost } from "../actions/posts";
import Modal from "./Modal";
import Hero from "./Hero";

const ReadPostPage = ({ match, history }) => {
  const { posts, dispatch } = useContext(PostsContext);
  const { user } = useContext(UserContext);
  const [post, setPost] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    const postData = posts.find(post => post._id === match.params.id);
    setPost(postData);
    setIsLoaded(true);
  }, [match.params.id, posts]);

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
          <Modal confirmAction={handleRemove} active={modalActive}>
            <h2>Delete post "{post.title}"?</h2>
          </Modal>
          <Post post={post} />
          {user && user.user._id === post.author._id && (
            <div className="content-container__edit list-item__content">
              <Link className="button" to={`/edit/${post._id}`}>
                <i className="fas fa-edit"></i> Edit post
              </Link>
              <button
                className="button button--delete"
                onClick={() => setModalActive(!modalActive)}
              >
                <i className="fas fa-trash-alt"></i> Delete post
              </button>
            </div>
          )}
          <h2 className="content-container__title">Comments:</h2>
          <CommentList comments={post.comments} />
          {user && <CommentForm id={post._id} />}
        </div>
      </div>
    </>
  );
};

export default withRouter(ReadPostPage);
