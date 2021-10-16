import React, { useContext } from "react";
import PostsList from "./PostsList";
import UserContext from "../context/user-context";
import Hero from "./Hero";

function DashboardPage() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Hero user={user} />
      <div className="content">
        <div className="content-container">
          <PostsList />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
