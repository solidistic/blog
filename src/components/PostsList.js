import React, { useContext, useState, useEffect } from "react";
import Post from "./Post";
import PostsContext from "../context/posts-context";
import postsSelector from "../selectors/posts";

const PostsList = () => {
  const { posts } = useContext(PostsContext);
  const [visiblePosts, setVisiblePosts] = useState(posts);

  useEffect(() => {
    setVisiblePosts(postsSelector(posts, ""));
  }, [posts]);

  const handleSearch = e => {
    setVisiblePosts(postsSelector(posts, e.target.value));
  };
  return (
    <div id="latest">
      <input className="input input--small" placeholder="Find posts" onChange={handleSearch} />
      {visiblePosts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        visiblePosts.map(post => (
          <div className="list-item" key={post._id}>
            <Post post={post} />
          </div>
        ))
      )}
    </div>
  );
};

export { PostsList as default };
