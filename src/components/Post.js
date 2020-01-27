import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post, author }) => (
  <div>
    <Link to={`/posts/${post._id}`}>
      <h2 className="list-item__title">{post.title}</h2>
    </Link>
    <div className="list-item__content">
      <p className="list-item__subtitle">
        {post.author ? (
          <>
            <Link
              className="list-item__subtitle--link"
              to={`/users/${post.author._id}`}
            >
              {post.author.username || author}
            </Link>{" "}
            posted this
          </>
        ) : (
          <>Posted by anonymous</>
        )}{" "}
        on {post.createdAt}
        {post.editedAt && <span> - Edited {post.editedAt}</span>}
      </p>
      <p className="list-item__body">{post.body}</p>
      {post.editComments && <p>{post.editComments}</p>}
    </div>
  </div>
);

export default Post;
