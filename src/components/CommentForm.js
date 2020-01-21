import React, { useState } from "react";
import moment from "moment";
import api from "../api";

const CommentForm = ({ id }) => {
  const [body, setBody] = useState("");

  const addComment = async e => {
    e.preventDefault();

    const createdAt = moment().format("D/MM/YYYY - hh:mm");
    
    await api.saveComment({ body, createdAt, id });
    setBody("");
  };

  return (
    <>
      <form onSubmit={addComment}>
        <input
          value={body}
          placeholder="Comment..."
          onChange={e => setBody(e.target.value)}
        />
        <button>Comment</button>
      </form>
    </>
  );
};

export default CommentForm;
