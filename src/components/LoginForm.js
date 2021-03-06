import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "../context/user-context";
import { startLogin } from "../actions/user";
import { addPost } from "../actions/posts";
import PostsContext from "../context/posts-context";

const LoginForm = ({ history }) => {
  const { dispatch } = useContext(PostsContext);
  const { userDispatch } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const [action, privatePosts] = await startLogin({ username, password });
      console.log("privatePosts", privatePosts);
      userDispatch(action);
      if (privatePosts && privatePosts.length > 0) {
        privatePosts.forEach(post => {
          dispatch(addPost(post));
        });
      }
      history.push("/");
    } catch (e) {
      console.error(e);
      toast("Unable to login, try again!");
    }
  };

  return (
    <>
      <ToastContainer
        hideProgressBar
        toastClassName="toast toast--alert"
        position="top-center"
      />
      <form onSubmit={handleLogin}>
        <input
          className="input"
          placeholder="Username"
          type="text"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="button">Login</button>
      </form>
    </>
  );
};

export default withRouter(LoginForm);
