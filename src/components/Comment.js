import React from "react";

const Comment = ({ createdAt, postedBy, body }) => (
  <div>
    <h3>{postedBy.username}</h3>
    <h4>{createdAt}</h4>
    <p>{body}</p>
  </div>
);

export default Comment;
