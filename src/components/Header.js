import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <div>
    <NavLink to="/" activeStyle={{ fontWeight: "italic", color: "red" }}>
      <h2>JM's Blog</h2>
    </NavLink>
    <NavLink to="/posts">Posts</NavLink>
    <NavLink to="/create">Create post</NavLink>
  </div>
);

export { Header as default };
