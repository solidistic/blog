import React from "react";

const InputSelector = ({
  selection = "Gallery",
  fileInput,
  checkFile,
  setIsModalActive,
  ...props
}) => {
  switch (selection) {
    case "Local":
      return (
        <input
          className="input input__file"
          type="file"
          name="heroImage"
          ref={fileInput}
          onChange={e => checkFile(e.target.files[0])}
        />
      );
    case "Gallery":
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
            {...props}
          />
        </div>
      );
    case "None":
      return (
        <input className="input" disabled placeholder="Using default image" />
      );
    default:
      return <div>Error</div>;
  }
};

export default InputSelector;
