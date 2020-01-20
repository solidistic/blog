import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/user-context";
import api from "../api";
import { logout } from "../actions/user";

const Header = () => {
  const { user, userDispatch } = useContext(UserContext);

  const handleLogout = () => {
    api.logout().then(() => userDispatch(logout()));
  };

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
          <NavLink to="/create">Create post</NavLink>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {!user && <NavLink to="/login">Login</NavLink>}
    </div>
  );
};

export { Header as default };
