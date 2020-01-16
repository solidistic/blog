import React, { useReducer, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./routers/AppRouter";
import * as serviceWorker from "./serviceWorker";
import PostsContext from "./context/posts-context";
import postsReducer from "./reducers/posts";
import api from "./api/index";
import { populatePosts } from "./actions/posts";

const App = () => {
  const [posts, dispatch] = useReducer(postsReducer, []);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    api
      .getAllPosts()
      .then(response => {
        dispatch(populatePosts(response.data));
        setDataFetched(true);
      })
      .catch(e => console.log(e))
      .finally(() => console.log("Data fetched from database"));
  }, []);

  if (!dataFetched) return <div>Loading</div>;
  return (
    <PostsContext.Provider value={{ posts, dispatch }}>
      <AppRouter />
    </PostsContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
