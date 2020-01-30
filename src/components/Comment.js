import React, { useContext, useState } from "react";
import PostsContext from "../context/posts-context";
import { startRemoveComment } from "../actions/comments";
import Modal from "./Modal";

const Comment = ({
  _id: commentId,
  createdAt,
  postedBy,
  body,
  user,
  postId
}) => {
  const { dispatch } = useContext(PostsContext);
  const [isModalActive, setIsModalActive] = useState(false);

  const handleRemove = async confirmRemoval => {
    if (confirmRemoval) {
      const commentAction = await startRemoveComment({ commentId, postId });
      if (commentAction.error) return console.error(commentAction.error);
      dispatch(commentAction);
    }
    setIsModalActive(false);
  };

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
          <Modal confirmAction={handleRemove} active={isModalActive}>
            <h2>Are you sure you want to remove comment?</h2>
          </Modal>
          {user && user.user._id === postedBy._id && (
            <i
              className="fas fa-times comment__icon"
              onClick={() => setIsModalActive(!isModalActive)}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
