import React from "react";
import { insertToTextarea } from "../utils/markdown/helper";

const MarkdownHelper = ({ inputRef }) => {
  return (
    <div className="input-group--vertical textarea__helper">
      <i
        onClick={() => insertToTextarea(inputRef, "codeBlock", "center")}
        className="button button--gray fas fa-code"
      ></i>
      <i
        onClick={() =>
          insertToTextarea(
            inputRef,
            "link"
          )
        }
        className="button button--gray fas fa-link"
      ></i>
      <i
        onClick={() => insertToTextarea(inputRef, "header")}
        className="button button--gray fas fa-heading"
      ></i>
    </div>
  );
};

export default MarkdownHelper;
