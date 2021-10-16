import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginPage = ({ history }) => {
  return (
    <div className="content">
      <div className="content-container--centered">
        <div className="content-container">
          <LoginForm history={history} />
          <p>
            Don't have an account yet?{" "}
            <Link className="link" to="/signup">
              Sign up
            </Link>
            !
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
