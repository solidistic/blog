import React from "react";

const InputSelector = ({
  selection = "None",
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
    case "URL":
      return (
        <input
          className="input input__file"
          placeholder="e.g. https://www.yourdomain.com/forest.jpg"
          type="text"
          ref={fileInput}
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
            onChange={() => console.log("muuttuuko")}
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
