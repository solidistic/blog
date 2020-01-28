import React from "react";
import { Link } from "react-router-dom";
import getRandomBG from "../utils/randomBackground";

const Hero = ({ user, post }) => {
  if (user) {
    return (
      <div
        className="content-container hero"
        style={{
          backgroundImage: `linear-gradient(30deg, #534a46ad, #312925ad), url(${getRandomBG()})`
        }}
      >
        <div className="hero__content">
          {/* <h1 className="hero__title">BlogPortal</h1> */}
          {user ? (
            <>
              <h1 className="hero__title">
                Welcome to BlogPortal, {user.user.username}!
              </h1>
              <p className="hero__subtitle">Web Development for life</p>
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
              <p className="hero__subtitle">Web Development for life</p>
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
          backgroundImage: `linear-gradient(#312925a2, #312925a2), url(${getRandomBG()})`
        }}
      >
        <div className="hero__content">
          {post && <h1 className="hero__title">{post.title}</h1>}
        </div>
      </div>
    );
  }
};

export default Hero;
