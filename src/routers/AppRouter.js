import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import DashboardPage from "../components/DashboardPage";
import CreatePost from "../components/CreatePost";
import ReadPostPage from "../components/ReadPostPage";
import EditPostPage from "../components/EditPostPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import Playground from "../test-data/Playground";

export const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={DashboardPage} exact={true} />
        <Route
          path="/posts"
          render={() => <div>Should render this... post</div>}
          exact={true}
        />
        <Route path="/posts/:id" component={ReadPostPage} />
        <Route path="/create" component={CreatePost} />
        <Route path="/edit/:id" component={EditPostPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export { AppRouter as default };
