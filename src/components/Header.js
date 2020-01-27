import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/user-context";
import api from "../api";
import { logout } from "../actions/user";

const Header = ({ history }) => {
  const { user, userDispatch } = useContext(UserContext);

  const handleLogout = () => {
    api.logout().then(() => userDispatch(logout()));
  };

  return (
    <div className="header">
      <div className="header-content">
        <NavLink to="/" exact={true}>
          <h2 className="header__title">Blog</h2>
        </NavLink>
        {user && (
          <div>
            <NavLink className="link__nav" to="/create">
              <i className="fas fa-plus fa-2x"></i>
            </NavLink>
            <NavLink className="link__nav" to="/account">
              <i className="fas fa-user fa-2x"></i>
            </NavLink>
            <button className="button--nav" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt fa-2x"></i>
            </button>
          </div>
        )}
        {!user && (
          <NavLink className="link__nav" to="/login">
            <i className="fas fa-sign-in-alt fa-2x"></i>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export { Header as default };
