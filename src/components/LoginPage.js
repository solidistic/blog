import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginPage = ({ history }) => {
  return (
    <>
      <LoginForm history={history}/>
      <div className="content-container">
        <p>
          Don't have an account yet?
          <Link to="/signup">Sign up</Link>.
        </p>
      </div>
    </>
  );
};

export default LoginPage;