import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = ({ message }) => (
  <div className="content">
    <div className="content-container">
      <h2 className="content-container__title">
        404 - {message ? message : "Page not found"}
      </h2>
      <p className="content-container__body">
        URL you tried to access doesn't exist.
      </p>
      <Link className="link" to="/">
        Back to dashboard
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
