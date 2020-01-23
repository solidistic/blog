import React from "react";
import PostsList from "./PostsList";

function DashboardPage() {
  return (
    <div className="App">
      <h2>Janne Mulari's blog</h2>
      <p>Welcome to my blog!</p>
      <p>
        I'm an engineering student who's interested in Web develpoment. Check
        out my posts!
      </p>
      <PostsList />
    </div>
  );
}

export default DashboardPage;
