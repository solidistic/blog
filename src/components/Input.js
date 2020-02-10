import React from "react";

const Input = ({ selection = "None", fileInput, checkFile }) => {
  console.log("input", selection);
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
    return (
      <input className="input" disabled placeholder="Using default image" />
    );
  }
};

export default Input;
