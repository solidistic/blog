import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments, user, postId }) => (
  <div>
    {comments && comments.length > 0 ? (
      comments.map(comment => {
        return (
          <Comment
            class="list-item"
            key={comment._id}
            postId={postId}
            user={user}
            {...comment}
          />
        );
      })
    ) : (
      <p>No comments yet, please leave yours now!</p>
    )}
  </div>
);

export default CommentList;
