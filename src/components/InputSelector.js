import React from "react";

const InputSelector = ({
  selection = "None",
  fileInput,
  checkFile,
  setIsModalActive,
  file,
  ...props
}) => {
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
        className="input input__file"
        placeholder="e.g. https://www.yourdomain.com/forest.jpg"
        type="text"
        ref={fileInput}
      />
    );
  } else if (selection === "Gallery") {
    return (
      <div className="input-group--vertical">
        <button
          className="button button--fixed"
          type="button"
          onClick={() => setIsModalActive(true)}
        >
          Open Gallery
        </button>
        <input
          className="input input__file"
          name="heroImage"
          disabled
          placeholder="Choose an image"
          onChange={() => console.log("muuttuuko")}
          {...props}
        />
      </div>
    );
  } else {
    return (
      <input className="input" disabled placeholder="Using default image" />
    );
  }
};

export default InputSelector;
