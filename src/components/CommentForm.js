import React, { useState, useContext } from "react";
import moment from "moment";
import { startAddComment } from "../actions/posts";
import PostsContext from "../context/posts-context";

const CommentForm = ({ id }) => {
  const { dispatch } = useContext(PostsContext);
  const [body, setBody] = useState("");
  const [active, setActivity] = useState(false);

  const addComment = async e => {
    e.preventDefault();
    setActivity(true);
    const createdAt = moment().format("D/MM/YYYY - hh:mm");
    dispatch(await startAddComment({ body, createdAt, id }));
    setBody("");
    setActivity(false);
  };

  return (
    <>
      <form onSubmit={addComment}>
        <input
          value={body}
          placeholder="Comment..."
          onChange={e => setBody(e.target.value)}
        />
        <button disabled={active}>Comment</button>
      </form>
    </>
  );
};

export default CommentForm;
