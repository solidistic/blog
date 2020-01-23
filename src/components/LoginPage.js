import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import Header from "./Header";

const LoginPage = ({ history }) => {
  return (
    <>
      <LoginForm history={history}/>
      <div>
        <p>
          Don't have an account yet?
          <Link to="/signup">Sign up</Link>.
        </p>
      </div>
    </>
  );
};

export default LoginPage;