import React from "react";
import { Link } from "react-router-dom";
import getRandomDefaultImage from "../utils/random-default-image";
import imagePath from "../utils/images/imagePath";

const Hero = ({ user, post }) => {
  let bgImage = undefined;
  if (post && post.image)
    bgImage = imagePath(
      post.image.name,
      "solidistic-blog.s3.eu-north-1.amazonaws.com"
    );

  if (!post) {
    return (
      <div
        className="content-container hero"
        style={{
          backgroundImage: `linear-gradient(30deg, #534a46ad, #312925ad), url(${getRandomDefaultImage()})`
        }}
      >
        <div className="hero__content">
          {user ? (
            <>
              <h1 className="hero__title">
                Glad to have you here, {user.username}!
              </h1>
              <p className="hero__subtitle">What you want to do next?</p>
              <div className="hero__button-group">
                <Link className="button button--big" to="/create">
                  Share your thoughts
                </Link>
                <a className="button button--big" href="#latest">
                  Read posts
                </a>
              </div>
            </>
          ) : (
            <>
              <h1 className="hero__title">Welcome to BlogPortal!</h1>
              <p className="hero__subtitle">Blogging made easy</p>
              <div className="hero__button-group">
                <Link className="button button--big" to="/signup">
                  Signup
                </Link>
                <Link className="button button--big" to="/login">
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="content-container hero"
        style={{
          backgroundImage: `linear-gradient(#312925a2, #312925a2), url(${bgImage ||
            getRandomDefaultImage()})`
        }}
      >
        <div className="hero__content">
          {post && <h1 className="hero__title">{post.title}</h1>}
        </div>
      </div>
    );
  }
};

export default React.memo(Hero);
