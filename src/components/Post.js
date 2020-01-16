import React from "react";

const Post = ({ post }) => (
  <div>
    <h2>
      {post.title} - {post._id}
    </h2>
    <p>
      <span>Posted at {post.createdAt}</span>
      {post.editedAt && <span> - Edited {post.editedAt}</span>}
    </p>
    <p>{post.body}</p>
    {post.editComments && <p>{post.editComments}</p>}
  </div>
);

export default Post;
