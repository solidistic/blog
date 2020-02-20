import React from "react";
import { insertToTextarea } from "../utils/markdown/helper";

/*
  name    | Markdown input
  ------------------------
  block   | ```\n\n``
  header  | #\u0020
  link    | [Link text](http://www.google.com\u0020"Title text")
  image   | ![Minion](https://octodex.github.com/images/minion.png)
*/

const MarkdownHelper = ({ inputRef }) => {
  return (
    <div className="input-group--vertical textarea__helper">
      <i
        onClick={() => insertToTextarea(inputRef, "block", "center")}
        className="button button--gray fas fa-code"
      ></i>
      <i
        onClick={() => insertToTextarea(inputRef, "link")}
        className="button button--gray fas fa-link"
      ></i>
      <i
        onClick={() => insertToTextarea(inputRef, "header")}
        className="button button--gray fas fa-heading"
      ></i>
      <i
        onClick={() => insertToTextarea(inputRef, "image")}
        className="button button--gray fas fa-images"
      ></i>
    </div>
  );
};

export default MarkdownHelper;
