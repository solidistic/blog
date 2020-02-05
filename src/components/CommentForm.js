import React, { useState, useContext } from "react";
import moment from "moment";
import { startAddComment } from "../actions/comments";
import PostsContext from "../context/posts-context";

const CommentForm = ({ id }) => {
  const { dispatch } = useContext(PostsContext);
  const [body, setBody] = useState("");
  const [active, setActivity] = useState(false);
  const [error, setError] = useState("");

  const addComment = async e => {
    e.preventDefault();
    try {
      if (body.length === 0) return setError("You must provide a comment");
      setActivity(true);
      const createdAt = moment().format("D.MM.YYYY - hh:mm");
      const res = await startAddComment({ body, createdAt, id });
      console.log(res);
      if (res.error) throw new Error();
      dispatch(res);
    } catch (e) {
      console.log(e);
      setError("Unable to create a new comment");
    }
    setBody("");
    setActivity(false);
  };

  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={addComment}>
        <input
          className="input"
          value={body}
          placeholder="Comment..."
          onChange={e => setBody(e.target.value)}
        />
        <button className="button" disabled={active} type="submit">
          Comment
        </button>
      </form>
    </>
  );
};

export default CommentForm;
