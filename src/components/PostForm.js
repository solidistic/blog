import React, { useState, useEffect, useRef, useCallback } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import md from "../utils/markdown/config";
import Modal from "./Modal";
import InputSelector from "./InputSelector";
import ImageGallery from "./ImageGallery";
import ErrorBoundary from "./ErrorPage";
import useEventListener from "../hooks/useEventListener";
import { getCursorLocation } from "../utils/markdown/helper";
import MarkdownHelper from "./MarkdownHelper";

export const PostForm = ({ post, onSubmit, active }) => {
  const hasHeroImage = post && post.image && post.image.name;
  const [title, setTitle] = useState(localStorage.getItem("title") || "");
  const [body, setBody] = useState(localStorage.getItem("body") || "");
  const [description, setDescription] = useState(
    localStorage.getItem("description") || ""
  );
  const [file, setFile] = useState(hasHeroImage ? post.image.name : null);
  const [postType, setPostType] = useState(
    post && post.isPublic ? "Public" : "Private"
  );
  const [isModalActive, setIsModalActive] = useState(false);
  const [heroSelectedFrom, setHeroSelectedFrom] = useState("Gallery");
  const fileInput = useRef(null);
  const textarea = useRef(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setDescription(post.description);
    }
  }, [post]);

  const submitPost = e => {
    e.preventDefault();
    const formData = new FormData();
    const isPublic = postType === "Public";

    let createdAt = moment()
      .local()
      .format("DD.MM.YYYY HH:mm");
    let editedAt;

    if (!title || !body) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      //setError("You need to fill all the fields");
      toast("You need to fill out all the fields!")
    } else {
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
      formData.append("description", description);
      formData.append("isPublic", isPublic);

      onSubmit(formData);
    }
  };

  const checkFile = useCallback(file => {
    if (!file) return;
    if (file.size > 2000000) {
      fileInput.current.value = null;
      return alert("File is too large");
    } else if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      fileInput.current.value = null;
      return alert("File must be an image");
    }
    setFile(file);
  }, []);

  const startSetFile = useCallback(
    file => {
      if (typeof file === "object") return checkFile(file);
      else if (typeof file === "string") setFile(file);
    },
    [checkFile]
  );

  const autoSave = useCallback(() => {
    console.log("Auto saving...");
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("body", body);
  }, [title, description, body]);

  useEffect(() => {
    const autosaver = setTimeout(() => {
      autoSave();
    }, 5000);

    return () => clearTimeout(autosaver);
  }, [autoSave]);

  const modifyKeyActions = useCallback(e => {
    const [initSelectionStart, initSelectionEnd] = getCursorLocation(textarea);
    const textBegin = e.target.value.substring(0, initSelectionStart);
    const textEnd = e.target.value.substring(
      initSelectionEnd,
      textarea.current.value.length
    );

    // TAB
    if (e.keyCode === 9) {
      e.preventDefault();
      const indent = "  ";
      e.target.value = textBegin + indent + textEnd;
      textarea.current.selectionStart = initSelectionStart + indent.length;
      textarea.current.selectionEnd = initSelectionEnd + indent.length;
    }

    // {
    if (e.key === "{") {
      e.preventDefault();
      const value = "{}";
      e.target.value = textBegin + value + textEnd;
      textarea.current.selectionStart = initSelectionStart + value.length - 1;
      textarea.current.selectionEnd = initSelectionEnd + value.length - 1;
    }
  }, []);

  useEventListener(
    "keydown",
    modifyKeyActions,
    document.getElementById("post-body")
  );

  return (
    <div className="input-group">
      <ToastContainer
        hideProgressBar
        toastClassName="toast toast--alert"
        position="top-center"
      />
      <ErrorBoundary>
        {heroSelectedFrom === "Gallery" && (
          <Modal
            active={isModalActive}
            confirmAction={() => setIsModalActive(false)}
          >
            <ImageGallery startSetFile={startSetFile} />
            <div className="content-container--vertical content-container--centered">
              <button
                className="button"
                onClick={() => {
                  setIsModalActive(false);
                }}
              >
                Save & Close
              </button>
              <button
                className="button"
                onClick={() => setIsModalActive(false)}
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
      </ErrorBoundary>
      <form onSubmit={submitPost}>
        <div className="input-group--vertical">
          <input
            className="input"
            placeholder="Title"
            defaultValue={title}
            maxLength="200"
            onChange={e => setTitle(e.target.value)}
          />
          <select
            className="input select"
            defaultValue={postType}
            onChange={e => setPostType(e.target.value)}
          >
            <option>Private</option>
            <option>Public</option>
          </select>
        </div>
        <textarea
          className="input"
          placeholder="Description (max. 200 characters)"
          defaultValue={description}
          onChange={e => setDescription(e.target.value)}
        />
        <legend className="legend">
          Optional hero image for you post (max. 2Mb):
        </legend>
        <div className="input-group--vertical">
          <select
            className="input select"
            value={heroSelectedFrom}
            onChange={e => setHeroSelectedFrom(e.target.value)}
          >
            <option>Gallery</option>
            <option>Local</option>
            <option>None</option>
          </select>
          <InputSelector
            selection={heroSelectedFrom}
            fileInput={fileInput}
            checkFile={startSetFile}
            setIsModalActive={setIsModalActive}
            value={file || "No image chosen"}
          />
        </div>
        <MarkdownHelper inputRef={textarea} />
        <textarea
          id="post-body"
          className="input textarea"
          placeholder="Post body"
          ref={textarea}
          defaultValue={body}
          onChange={e => {
            setBody(e.target.value);
          }}
        />
        <button type="submit" className="button button--wide" disabled={active}>
          {postType === "Private" ? "Save" : "Publish"}
        </button>
      </form>
      <div dangerouslySetInnerHTML={{ __html: md.render(body) }} />
    </div>
  );
};

export default React.memo(withRouter(PostForm));
