import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

export const PostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const submitPost = e => {
    e.preventDefault();
    let createdAt = moment().format("D/MM/YYYY");
    let editedAt;
    if (!title || !body) setError("Title and body are required");
    else {
      if (post) {
        createdAt = post.createdAt;
        editedAt = moment().format("D/MM/YYYY");
      }
      onSubmit({ title, body, createdAt, editedAt });
    }
  };

  return (
    <form onSubmit={submitPost}>
      {error && <p>{error}</p>}
      <input
        placeholder="Title"
        defaultValue={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Post body"
        defaultValue={body}
        onChange={e => setBody(e.target.value)}
      />
      <button type="submit">Publish</button>
    </form>
  );
};

export default withRouter(PostForm);
