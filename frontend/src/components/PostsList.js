import React, { useContext, useState, useEffect } from "react";
import Card from "./Card";
import PostsContext from "../context/posts-context";
import postsSelector from "../selectors/posts";

const PostsList = ({ isPublic = true, showSearchBar = true }) => {
  const { posts } = useContext(PostsContext);
  const [publicPosts, setPublicPosts] = useState(posts);
  const [visiblePosts, setVisiblePosts] = useState(publicPosts);

  useEffect(() => {
    const temp = posts.filter(post => post.isPublic === isPublic);
    setPublicPosts(temp);
  }, [posts, isPublic]);

  useEffect(() => {
    setVisiblePosts(postsSelector(publicPosts, ""));
  }, [publicPosts]);

  const handleSearch = e => {
    setVisiblePosts(postsSelector(publicPosts, e.target.value));
  };

  return (
    <div id="latest">
      {showSearchBar && (
        <input
          className="input input--small input__search"
          placeholder="Find posts"
          onChange={handleSearch}
        />
      )}
      {visiblePosts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        visiblePosts.map(post => (
          <div className="list-item" key={post._id}>
            <Card post={post} />
          </div>
        ))
      )}
    </div>
  );
};

export { PostsList as default };
