import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import Modal from "./Modal";
import InputSelector from "./InputSelector";
import ImageGallery from "./ImageGallery";
import ErrorBoundary from "./ErrorPage";

export const PostForm = ({ post, onSubmit, active }) => {
  const hasHeroImage = post && post.image && post.image.name;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(hasHeroImage ? post.image.name : null);
  const [error, setError] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [heroSelectedFrom, setHeroSelectedFrom] = useState("None");
  const fileInput = useRef(null);

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

      if (file) formData.append("heroImage", file);
      formData.append("title", title);
      formData.append("body", body);
      formData.append("createdAt", createdAt);

      // onSubmit({ title, body, createdAt, editedAt });
      onSubmit(formData);
    }
  };

  const checkFile = file => {
    console.log("checkfile", file);
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

  const startSetFile = file => {
    console.log("callind startsetFile", typeof file);
    if (typeof file === "object") return checkFile(file);
    else if (typeof file === "string") setFile(file);
  };

  return (
    <div className="input-group">
      <Modal
        active={isModalActive}
        confirmAction={() => setIsModalActive(false)}
      >
        <ErrorBoundary>
          {/* <h2>Images gallery</h2> */}
          {post ? (
            <ImageGallery currentHeroImage={file} startSetFile={startSetFile} />
          ) : (
            <ImageGallery />
          )}
        </ErrorBoundary>
      </Modal>
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
            className="input select"
            onChange={e => setHeroSelectedFrom(e.target.value)}
          >
            <option>None</option>
            <option>Local</option>
            <option>URL</option>
            <option>Gallery</option>
          </select>
          <InputSelector
            selection={heroSelectedFrom}
            fileInput={fileInput}
            checkFile={startSetFile}
            setIsModalActive={setIsModalActive}
            // defaultValue={hasHeroImage ? post.image.name : "No image selected"}
            value={file || "No image chosen"}
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
