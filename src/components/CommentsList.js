import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments }) => (
  <div>
    {comments ? (
      comments.map(comment => {
        return <Comment class="list-item" key={comment._id} {...comment} />;
      })
    ) : (
      <p>No comments yet</p>
    )}
  </div>
);

export default CommentList;
