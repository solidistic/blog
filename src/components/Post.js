import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => (
  <div>
    <Link to={`/posts/${post._id}`}>
      <h2>
        {post.title} - {post._id}
      </h2>
    </Link>
    <p>
      <span>
        {post.author && (
          <span>
            <Link to={`/users/${post.author._id}`}>{post.author.username}</Link>
          </span>
        )}
        posted this at {post.createdAt}
      </span>
      {post.editedAt && <span> - Edited {post.editedAt}</span>}
    </p>
    <p>{post.body}</p>
    {post.editComments && <p>{post.editComments}</p>}
  </div>
);

export default Post;
