import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div>
    <h2>404 - Page not found</h2>
    <p>URL you tried to access doesn't exist.</p>
    <Link to="/">Back to dashboard</Link>
  </div>
);

export default NotFoundPage;