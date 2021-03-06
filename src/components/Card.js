import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import showImage from "../utils/images/showImage";
import getRandomDefaultImage from "../utils/random-default-image";

const useDescription = body => {
  const descLength = 300;
  if (body.length < descLength) return [body, descLength];
  return [body.slice(0, descLength), descLength];
};

const Card = ({ post, author }) => {
  const [postMoment, setPostMoment] = useState("");
  const [editMoment, setEditMoment] = useState(undefined);
  const [description, descLength] = useDescription(post.body);

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
        setEditMoment(post.editedAt);
      }
    }

    if (parseInt(daysFromPost[0]) < 7 || isNaN(parseInt(daysFromPost)))
      return setPostMoment(daysFromPost);

    setPostMoment(post.createdAt);
  }, [post]);

  return (
    <div className="input-group--vertical">
      <div className="content-container--centered">
        {post.image
          ? showImage(post.image.name)
          : showImage(getRandomDefaultImage(), true)}
      </div>
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
        <p className="list-item__body">
          {post.description ||
            (post.body.length <= descLength ? post.body : `${description}...`)}
        </p>
        {post.editComments && <p>{post.editComments}</p>}
      </div>
    </div>
  );
};
export default React.memo(Card);
