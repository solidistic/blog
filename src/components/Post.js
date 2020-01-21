import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post, author }) => (
  <div>
    <Link to={`/posts/${post._id}`}>
      <h2>
        {post.title} - {post._id}
      </h2>
    </Link>
    <div>
      <>
        {post.author ? (
          <>
            <Link to={`/users/${post.author._id}`}>
              {post.author.username || author}
            </Link>{" "}
            posted this
          </>
        ) : (
          <>Posted by anonymous</>
        )}{" "}
        at {post.createdAt}
      </>
      {post.editedAt && <span> - Edited {post.editedAt}</span>}
    </div>
    <p>{post.body}</p>
    {post.editComments && <p>{post.editComments}</p>}
  </div>
);

export default Post;
