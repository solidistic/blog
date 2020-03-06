import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import md from "../utils/markdown/config";
import { Link } from "react-router-dom";
import { startToggleLike } from "../actions/posts";
import PostsContext from "../context/posts-context";

const Post = ({ post, author, user }) => {
  const { dispatch } = useContext(PostsContext);
  const [postMoment, setPostMoment] = useState("");
  const [error, setError] = useState(null);
  const [editMoment, setEditMoment] = useState(undefined);

  useEffect(() => {
    moment.defaultFormat = "DD.MM.YYYY HH:mm";
    const daysFromPost = moment(post.createdAt, moment.defaultFormat).fromNow();

    if (post.editedAt) {
      const daysFromEdit = moment(
        post.editedAt,
        moment.defaultFormat
      ).fromNow();

      if (parseInt(daysFromEdit[0]) < 7 || isNaN(parseInt(daysFromEdit))) {
        setEditMoment(daysFromEdit);
      } else {
        setEditMoment(post.daysFromEdit);
      }
    }

    if (parseInt(daysFromPost[0]) < 7 || isNaN(parseInt(daysFromPost)))
      return setPostMoment(daysFromPost);

    setPostMoment(post.createdAt);
  }, [post]);

  const toggleLike = async () => {
    if (!user) setError("Please login to like the post");

    try {
      const action = await startToggleLike(post._id, user._id);
      console.log("TOGGLE LIKE ACTION", action);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="post-container__title">
        <h2 className="content-container__title">{post.title}</h2>
        <div className="post-container__likes">
          {error && <p className="message__error">{error}</p>}
          <p className="post__likes">{post.likes.count}</p>
          {user && post.likes.users.includes(user._id) ? (
            <img
              className="post__heart"
              src="/images/liked.png"
              alt="Unliked"
              onClick={toggleLike}
            />
          ) : (
            <img
              className="post__heart"
              src="/images/unliked.png"
              alt="Unliked"
              onClick={toggleLike}
            />
          )}
        </div>
      </div>
      <p className="list-item__subtitle">
        {post.author ? (
          <>
            <Link
              className="list-item__subtitle--link"
              to={`/users/${post.author._id}`}
            >
              {post.author.username || author}
            </Link>{" "}
            posted this
          </>
        ) : (
          <>Posted by anonymous</>
        )}{" "}
        {postMoment}
        {post.editedAt && <span> - Edited {editMoment}</span>}
      </p>
      <div className="content-container__markdown">
        <div dangerouslySetInnerHTML={{ __html: md.render(post.body) }} />
      </div>
    </div>
  );
};
export default React.memo(Post);
