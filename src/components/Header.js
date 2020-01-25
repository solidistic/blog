import React, { useContext } from "react";
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

  return (
    <div className="header">
      <NavLink to="/" exact={true}>
        <h2 className="header__title">Blog</h2>
      </NavLink>
      {user && (
        <>
          <NavLink className="link" to="/create">Create post</NavLink>
          <NavLink className="link" to="/users/me">My account</NavLink>
          <button className="button--nav" onClick={handleLogout}>Logout</button>
          <button className="button--nav" onClick={handleRemoveUser}>Delete account</button>
        </>
      )}
      {!user && <NavLink to="/login">Login</NavLink>}
    </div>
  );
};

export { Header as default };
