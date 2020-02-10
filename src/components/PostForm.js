import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import Modal from "./Modal";
import Input from "./Input";

export const PostForm = ({ post, onSubmit, active }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isModalActive, setIsModalActive] = useState(false);
  const [heroSelection, setHeroSelection] = useState("None");
  const fileInput = useRef(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const showImage = image => {
    return (
      <img
        className="hero-preview"
        src={`http://localhost:8080/images/${image.name}`}
        alt="testi"
      />
    );
  };

  const submitPost = e => {
    e.preventDefault();
    const formData = new FormData();

    let createdAt = moment()
      .local()
      .format("DD.MM.YYYY HH:mm");
    let editedAt;

    if (!title || !body) setError("Title and body are required");
    else {
      if (post) {
        createdAt = post.createdAt;
        editedAt = moment()
          .local()
          .format("DD.MM.YYYY HH:mm");
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

  const handleInputSelection = selection => {
    if (selection === "Local") {
      return (
        <input
          className="input"
          type="file"
          name="heroImage"
          ref={fileInput}
          onChange={e => checkFile(e.target.files[0])}
        />
      );
    } else if (selection === "URL") {
      return <input className="input" type="text" ref={fileInput} />;
    } else {
      return null;
    }
  };

  const checkFile = file => {
    if (!file) return;
    if (file.size > 2000000) {
      fileInput.current.value = null;
      return alert("File is too large");
    } else if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      fileInput.current.value = null;
      return alert("File must be an image");
    }
    setFile(file);
  };

  return (
    <div className="input-group">
      {post && post.image && (
        <div>
          <Modal
            active={isModalActive}
            confirmAction={() => setIsModalActive(false)}
          >
            <p>Current post image:</p>
            {showImage(post.image.name)}
          </Modal>
          <button className="button" onClick={() => setIsModalActive(true)}>
            View hero
          </button>
        </div>
      )}
      <form onSubmit={submitPost}>
        {error && <p>{error}</p>}
        <input
          className="input"
          placeholder="Title"
          defaultValue={title}
          onChange={e => setTitle(e.target.value)}
        />
        <legend className="legend">
          Optional hero image for you post (max. 2Mb):
        </legend>
        <div className="input-group--vertical">
          <select
            className="input"
            onChange={e => setHeroSelection(e.target.value)}
          >
            <option>None</option>
            <option>Local</option>
            <option>URL</option>
          </select>
          <Input
            selection={heroSelection}
            fileInput={fileInput}
            checkFile={checkFile}
          />
        </div>
        <textarea
          className="input textarea"
          placeholder="Post body"
          defaultValue={body}
          onChange={e => setBody(e.target.value)}
        />
        <button type="submit" className="button button--wide" disabled={active}>
          Publish
        </button>
      </form>
    </div>
  );
};

export default withRouter(PostForm);
