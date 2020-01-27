import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import { withRouter } from "react-router";
import PostsContext from "../context/posts-context";
import UserContext from "../context/user-context";
import CommentList from "./CommentsList";
import CommentForm from "./CommentForm";
import LoadingPage from "./LoadingPage";

const ReadPostPage = ({ match, history }) => {
  const { posts } = useContext(PostsContext);
  const { user } = useContext(UserContext);
  const [post, setPost] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const postData = posts.find(post => post._id === match.params.id);
    setPost(postData);
    // setIsLoaded(true);
  }, [match.params.id, posts]);

  // useEffect(() => {
  //   const isOwner = () => {
  //     console.log("IS OWNER:");
  //     console.log(user);
  //     console.log(post);
  //     if (user && post) return user._id === post.author._id;
  //   };
  //   isOwner();
  // }, [user, post]);

  if (!isLoaded) return <LoadingPage />;
  return (
    <div className="content">
      <div className="content-container">
        <Post post={post} />
        {user && user._id === post.author._id && (
          <Link className="link" to={`/edit/${post._id}`}>
            Edit post
          </Link>
        )}
        <h2 className="content-container__title">Comments:</h2>
        <CommentList comments={post.comments} />
        {user && <CommentForm id={post._id} />}
      </div>
    </div>
  );
};

export default withRouter(ReadPostPage);
