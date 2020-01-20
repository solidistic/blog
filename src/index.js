import React, { useReducer, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./routers/AppRouter";
import * as serviceWorker from "./serviceWorker";
import PostsContext from "./context/posts-context";
import postsReducer from "./reducers/posts";
import userReducer from "./reducers/user";
import api from "./api/index";
import { populatePosts } from "./actions/posts";
import UserContext from "./context/user-context";
import { startLogin } from "./actions/user";

const App = () => {
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
    api.login().then(res => {
      const { username, password } = res.data.user;
      startLogin({ username, password }).then(login => userDispatch(login));
    });
  }, []);

  if (!dataFetched) return <div>Loading...</div>;
  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      <PostsContext.Provider value={{ posts, dispatch }}>
        <AppRouter />
      </PostsContext.Provider>
    </UserContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
