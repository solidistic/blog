import React, { useContext, useState, useCallback } from "react";
import { withRouter } from "react-router-dom";
import PostsContext from "../context/posts-context";
import { startRemoveComment } from "../actions/comments";
import Comment from "./Comment";
import Modal from "./Modal";

const CommentList = ({ comments, user, match }) => {
  const { dispatch } = useContext(PostsContext);
  const [isModalActive, setIsModalActive] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const postId = match.params.id;

  const startHandleRemoveComment = id => {
    setCommentId(id);
    setIsModalActive(true);
  };

  const handleRemove = useCallback(
    async confirmRemoval => {
      if (confirmRemoval) {
        const commentAction = await startRemoveComment({ commentId, postId });
        if (commentAction.error) return console.error(commentAction.error);
        dispatch(commentAction);
      }
      setIsModalActive(false);
    },
    [commentId, postId, dispatch]
  );

  return (
    <div>
      <Modal confirmAction={handleRemove} active={isModalActive}>
        <h2>Are you sure you want to remove comment?</h2>
      </Modal>

      {comments && comments.length > 0 ? (
        comments.map(comment => {
          return (
            <Comment
              class="list-item"
              key={comment._id}
              user={user}
              setIsModalActive={setIsModalActive}
              removeComment={startHandleRemoveComment}
              {...comment}
            />
          );
        })
      ) : (
        <p>No comments yet, please leave yours now!</p>
      )}
    </div>
  );
};

export default withRouter(CommentList);
