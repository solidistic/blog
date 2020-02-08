import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Post from "./Post";
import UserContext from "../context/user-context";
import PostsContext from "../context/posts-context";
import { logout, startRemoveUser } from "../actions/user";
import { removeAllFromUser } from "../actions/posts";
import LoadingPage from "./LoadingPage";
import Modal from "./Modal";

const ViewUserProfilePage = ({ history, match }) => {
  const { posts, dispatch } = useContext(PostsContext);
  const { user: loggedUser, userDispatch } = useContext(UserContext);
  const [user, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const getPostsFromUser = useCallback(
    userId => {
      return posts.filter(post => {
        console.log(post.author._id, userId);
        return post.author._id === userId;
      });
    },
    [posts]
  );

  useEffect(() => {
    console.log("useEffect");

    const id =
      history.location.pathname === "/account" && loggedUser._id
        ? loggedUser._id
        : match.params.id;

    const loadUser = async () => {
      const res = await api.getUserById(id);
      console.log(res);
      if (res.status !== 200) {
        setError(true);
        return setIsLoaded(true);
      }
      const postsData = getPostsFromUser(id);
      setCurrentUser(res.data);
      setUserPosts(postsData);
      setIsLoaded(true);
    };

    if (!isLoaded) loadUser();
  }, [match.params.id, loggedUser, history, user, isLoaded, getPostsFromUser]);

  const handleRemoveUser = async confirmRemoval => {
    if (confirmRemoval) {
      try {
        const id = await startRemoveUser();
        console.log("REMOVED USER ID", id);
        await dispatch(removeAllFromUser(id));
        userDispatch(logout());
        history.push("/");
      } catch (e) {
        console.log("Unable to safely remove account:", e);
      }
    } else {
      setModalActive(false);
    }
  };

  if (!isLoaded) return <LoadingPage />;
  else {
    return (
      <div className="content">
        <div className="content-container">
          {!error ? (
            <div>
              <div className="content-container__information">
                <h3 className="content-container__subtitle">
                  Account information
                </h3>
                <p>
                  <span className="content-container__subtitle--secondary">
                    Username:
                  </span>{" "}
                  {user.username}
                </p>
                <p>
                  <span className="content-container__subtitle--secondary">
                    First name:
                  </span>{" "}
                  {user.firstName}
                </p>
                <p>
                  <span className="content-container__subtitle--secondary">
                    Last name:
                  </span>{" "}
                  {user.lastName}
                </p>
                <p>
                  <span className="content-container__subtitle--secondary">
                    Email:
                  </span>{" "}
                  {user.email}
                </p>
                <p>
                  <span className="content-container__subtitle--secondary">
                    Description:
                  </span>{" "}
                  {user.description}
                </p>
                {loggedUser._id === user._id && (
                  <div>
                    <Modal
                      active={modalActive}
                      confirmAction={handleRemoveUser}
                    >
                      <h2>Are you sure to remove your account PERMANENTLY?</h2>
                      <button
                        className="button button--delete"
                        onClick={() => handleRemoveUser(true)}
                      >
                        <i className="fas fa-check"></i> Yes
                      </button>
                      <button
                        className="button"
                        onClick={() => handleRemoveUser(false)}
                      >
                        <i className="fas fa-times"></i> No
                      </button>
                    </Modal>
                    <Link className="button" to="/account/edit">
                      <i className="fas fa-edit"></i> Change information
                    </Link>
                    <button
                      className="button button--delete"
                      onClick={() => setModalActive(!modalActive)}
                    >
                      <i className="fas fa-trash-alt"></i> Delete account
                    </button>
                  </div>
                )}
              </div>
              <div>
                <h2 className="content-container__title">Your latest posts:</h2>
                {userPosts && userPosts.length > 0 ? (
                  userPosts.map(post => (
                    <div className="list-item" key={post._id}>
                      <Post post={post} author={user.username} />
                    </div>
                  ))
                ) : (
                  <p>No posts yet</p>
                )}
              </div>
            </div>
          ) : (
            <div>User not found</div>
          )}
        </div>
      </div>
    );
  }
};

export default ViewUserProfilePage;
