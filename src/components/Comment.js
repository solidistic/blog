import React from "react";

const Comment = ({ _id, createdAt, postedBy, body, user, removeComment }) => {
  return (
    <div className="content-container__information">
      <div className="comment">
        <div>
          <h3 className="list-item__commentTitle">
            {postedBy.username}
            <span className="list-item__subtitle"> - {createdAt}</span>
          </h3>
          <p className="list-item__body list-item__content">{body}</p>
        </div>
        <div>
          {user && user.user._id === postedBy._id && (
            <i
              className="fas fa-times comment__icon"
              onClick={() => removeComment(_id)}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Comment);
