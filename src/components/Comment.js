import React from "react";

const Comment = ({ createdAt, postedBy, body }) => (
  <div className="content-container__information">
    <h3 className="list-item__commentTitle">
      {postedBy.username}
      <span className="list-item__subtitle"> - {createdAt}</span>
    </h3>
    <p className="list-item__body list-item__content">{body}</p>
  </div>
);

export default Comment;
