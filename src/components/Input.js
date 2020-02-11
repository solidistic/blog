import React from "react";

const Input = ({
  selection = "None",
  fileInput,
  checkFile,
  setIsModalActive
}) => {
  console.log("input", selection);
  if (selection === "Local") {
    return (
      <input
        className="input input__file"
        type="file"
        name="heroImage"
        ref={fileInput}
        onChange={e => checkFile(e.target.files[0])}
      />
    );
  } else if (selection === "URL") {
    return (
      <input
        className="input"
        placeholder="e.g. https://www.yourdomain.com/forest.jpg"
        type="text"
        ref={fileInput}
      />
    );
  } else if (selection === "Gallery") {
    return (
      <button
        className="button button--fixed"
        type="button"
        onClick={() => setIsModalActive(true)}
      >
        Open Gallery
      </button>
    );
  } else {
    return (
      <input className="input" disabled placeholder="Using default image" />
    );
  }
};

export default Input;
