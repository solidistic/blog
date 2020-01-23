import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/user-context";
import PostsContext from "../context/posts-context";
import api from "../api";
import { logout, startRemoveUser } from "../actions/user";
import { removeAllFromUser } from "../actions/posts";

const Header = ({ history }) => {
  const { dispatch } = useContext(PostsContext);
  const { user, userDispatch } = useContext(UserContext);

  const handleLogout = () => {
    api.logout().then(() => userDispatch(logout()));
  };

  const handleRemoveUser = async () => {
    try {
      const id = await startRemoveUser();
      console.log("REMOVED USER ID", id);
      await dispatch(removeAllFromUser(id));
      userDispatch(logout());
      history.push("/");
    } catch (e) {
      console.log("Unable to safely remove account:", e);
    }
  };

  // useEffect(() => {
  //   console.log("USER OBJECT", user);
  // }, [user]);

  return (
    <div>
      <NavLink
        to="/"
        exact={true}
        activeStyle={{ fontWeight: "italic", color: "red" }}
      >
        <h2>JM's Blog</h2>
      </NavLink>
      {user && (
        <>
          <h2>Welcome, {user.user.username}!</h2>
          <NavLink to="/create">Create post</NavLink>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleRemoveUser}>Delete account</button>
        </>
      )}
      {!user && <NavLink to="/login">Login</NavLink>}
    </div>
  );
};

export { Header as default };
