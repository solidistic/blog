import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

export const PostForm = ({ post, onSubmit, active }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const submitPost = e => {
    e.preventDefault();
    const formData = new FormData();

    let createdAt = moment()
      .local()
      .format("D.MM.YYYY HH:mm");
    let editedAt;

    if (!title || !body) setError("Title and body are required");
    else {
      if (post) {
        createdAt = post.createdAt;
        editedAt = moment()
          .local()
          .format("D.MM.YYYY HH:mm");
        formData.append("editedAt", editedAt);
      }

      formData.append("heroImage", file);
      formData.append("title", title);
      formData.append("body", body);
      formData.append("createdAt", createdAt);

      // onSubmit({ title, body, createdAt, editedAt });
      onSubmit(formData);
    }
  };

  return (
    <div className="input-group">
      <form onSubmit={submitPost}>
        {error && <p>{error}</p>}
        <input
          className="input"
          placeholder="Title"
          defaultValue={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="input"
          type="file"
          name="heroImage"
          onChange={e => setFile(e.target.files[0])}
        />
        <textarea
          className="input textarea"
          placeholder="Post body"
          defaultValue={body}
          onChange={e => setBody(e.target.value)}
        />
        <button className="button button--wide" disabled={active}>
          Publish
        </button>
      </form>
    </div>
  );
};

export default withRouter(PostForm);
