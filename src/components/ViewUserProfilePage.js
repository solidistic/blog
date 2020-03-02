import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Card from "./Card";
import UserContext from "../context/user-context";
import PostsContext from "../context/posts-context";
import { logout, startRemoveUser } from "../actions/user";
import { removeAllFromUser } from "../actions/posts";
import LoadingPage from "./LoadingPage";
import Modal from "./Modal";
import NotFoundPage from "./NotFoundPage";

const ViewUserProfilePage = ({ history, match }) => {
  const { posts, dispatch } = useContext(PostsContext);
  const { user: loggedUser, userDispatch } = useContext(UserContext);
  const [user, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOwner, setIsOwner] = useState(undefined);
  const [error, setError] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const getPostsFromUser = useCallback(
    userId => {
      return posts.filter(post => {
        return post.author._id === userId;
      });
    },
    [posts]
  );

  useEffect(() => {
    const id =
      history.location.pathname === "/account" && loggedUser._id
        ? loggedUser._id
        : match.params.id;

    if (id === loggedUser._id) setIsOwner(true);

    const loadUser = async () => {
      const userData = await api.getUserById(id);
      if (userData instanceof Error) {
        setError(true);
        return setIsLoaded(true);
      }

      const postsData = getPostsFromUser(id);
      setCurrentUser(userData.data);
      setUserPosts(postsData);
      setIsLoaded(true);
    };

    if (!isLoaded) loadUser();
  }, [match.params.id, loggedUser, history, isLoaded, getPostsFromUser]);

  const handleRemoveUser = async confirmRemoval => {
    if (confirmRemoval) {
      try {
        const id = await startRemoveUser();
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
                <div className="input-group--vertical">
                  <>
                    <img
                      src="/images/user.svg"
                      alt="profile"
                      style={{ height: 40, borderRadius: "30%" }}
                    />
                  </>
                  <div className="account__title">
                    <h3>{user.username}</h3>
                  </div>
                </div>
                <div className="account__information">
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
                </div>
                {isOwner && (
                  <div className="account__owner-panel">
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
                {isOwner &&
                  loggedUser &&
                  loggedUser.posts.length > 0 &&
                  loggedUser.posts.map(post => {
                    console.log(post);
                    return (
                      <div className="list-item" key={post._id}>
                        <Card post={post} author={user.username} />
                      </div>
                    );
                  })}
                <h2 className="content-container__title">
                  Latest posts from {user.username}
                </h2>
                {userPosts && userPosts.length > 0 ? (
                  userPosts.map(post => (
                    <div className="list-item" key={post._id}>
                      <Card post={post} author={user.username} />
                    </div>
                  ))
                ) : (
                  <p>No posts yet</p>
                )}
              </div>
            </div>
          ) : (
            <NotFoundPage message="User not found" />
          )}
        </div>
      </div>
    );
  }
};

export default ViewUserProfilePage;
