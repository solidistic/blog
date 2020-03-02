import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../context/user-context";
import { startLogin } from "../actions/user";

const LoginForm = ({ history }) => {
  const { userDispatch } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async e => {
    e.preventDefault();
    try {
      userDispatch(await startLogin({ username, password }));
      history.push("/");
    } catch (e) {
      console.error(e);
      return setError("Unable to login, try again");
    }
  };

  return (
    <>
      {error && <p className="message__error">{error}</p>}
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
