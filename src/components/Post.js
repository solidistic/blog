import React, { useState, useEffect } from "react";
import moment from "moment";
import md from "../utils/markdown/config";
import { Link } from "react-router-dom";

const Post = ({ post, author }) => {
  const [postMoment, setPostMoment] = useState("");
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

  return (
    <div>
      <h2 className="content-container__title">{post.title}</h2>
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
