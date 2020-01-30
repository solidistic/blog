import React, { useReducer, useEffect, useState } from "react";
import AppRouter from "../routers/AppRouter";
import PostsContext from "../context/posts-context";
import postsReducer from "../reducers/posts";
import userReducer from "../reducers/user";
import api from "../api/index";
import { populatePosts } from "../actions/posts";
import UserContext from "../context/user-context";
import { startLogin } from "../actions/user";
import LoadingPage from "./LoadingPage";
import ErrorBoundary from "./ErrorPage";

const BlogApp = () => {
  const [posts, dispatch] = useReducer(postsReducer, []);
  const [user, userDispatch] = useReducer(userReducer, undefined);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    api
      .getAllPosts()
      .then(response => {
        dispatch(populatePosts(response.data));
      })
      .catch(e => console.error(e))
      .finally(() => {
        console.log("Data fetched from database");
        setDataFetched(true);
      });

    // check for possible login with current active token
    api
      .login()
      .then(res => {
        if (res.status === 200) {
          const { username, password } = res.data.user;
          startLogin({ username, password }).then(login => userDispatch(login));
        }
      })
      .catch(e => console.error(e));
  }, []);

  if (!dataFetched) return <LoadingPage />;
  return (
    // <ErrorBoundary>
    <UserContext.Provider value={{ user, userDispatch }}>
      <PostsContext.Provider value={{ posts, dispatch }}>
        <AppRouter />
      </PostsContext.Provider>
    </UserContext.Provider>
    // </ErrorBoundary>
  );
};

export default BlogApp;
