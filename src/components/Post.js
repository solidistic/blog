import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import showImage from "../utils/showImage";

const Post = ({ post, author }) => {
  const [postMoment, setPostMoment] = useState("");
  const [editMoment, setEditMoment] = useState(undefined);

  const showImageFromBuffer = buffer => {
    return (
      <img
        className="hero-preview"
        src={`data:${buffer.contentType};base64,${Buffer.from(
          buffer.data
        ).toString("base64")}`}
        alt="Hero"
      />
    );
  };

  useEffect(() => {
    moment.defaultFormat = "D.MM.YYYY HH:mm";
    const daysFromPost = moment(post.createdAt, moment.defaultFormat).fromNow();
    if (post.editedAt) {
      const daysFromEdit = moment(
        post.editedAt,
        moment.defaultFormat
      ).fromNow();

      if (parseInt(daysFromEdit[0]) < 7 || isNaN(daysFromEdit)) {
        setEditMoment(daysFromEdit);
      } else {
        setEditMoment(post.daysFromEdit);
      }
    }

    if (parseInt(daysFromPost[0]) < 7 || isNaN(daysFromPost))
      return setPostMoment(daysFromPost);

    setPostMoment(post.createdAt);
  }, [post]);

  return (
    <div className="input-group__name">
      <div>{post.image && showImage(post.image)}</div>
      <div className="list-item__content">
        <Link to={`/posts/${post._id}`}>
          <h2 className="list-item__title">{post.title}</h2>
        </Link>
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
        <p className="list-item__body">{post.body}</p>
        {post.editComments && <p>{post.editComments}</p>}
      </div>
    </div>
  );
};
export default React.memo(Post);
