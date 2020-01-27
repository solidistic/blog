import React, { useContext } from "react";
import PostsList from "./PostsList";
import UserContext from "../context/user-context";
import bgOne from "../images/blog.jpg";
import bgTwo from "../images/blog2.jpg";
import bgThree from "../images/blog3.jpg";

const getRandomBG = () => {
  const bgs = [bgOne, bgTwo, bgThree];
  const random = Math.floor(Math.random() * bgs.length);
  return bgs[random];
};

function DashboardPage() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div
        className="content-container hero"
        style={{
          backgroundImage: `linear-gradient(#312925a2, #312925a2), url(${getRandomBG()})`
        }}
      >
        <div className="hero__content">
          <h1>BlogPortal</h1>
          {user ? (
            <h1 className="hero__subtitle">Welcome, {user.user.username}!</h1>
          ) : (
            <h1 className="hero__subtitle">Welcome!</h1>
          )}
          <p className="">Web Development for life</p>
        </div>
      </div>
      <div className="content">
        <div className="content-container">
          <PostsList />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
