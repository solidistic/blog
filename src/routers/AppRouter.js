import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardPage from "../components/DashboardPage";
import CreatePost from "../components/CreatePost";
import ReadPostPage from "../components/ReadPostPage";
import EditPostPage from "../components/EditPostPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import ViewUserProfilePage from "../components/ViewUserProfilePage";
import Header from "../components/Header";
import CreateAccountPage from "../components/CreateAccountPage";
import EditAccountPage from "../components/EditAccountPage";
// import Playground from "../playground/Playground";
import Footer from "../components/Footer";
import ImageGallery from "../components/ImageGallery";
import Playground from "../playground/Playground";

export const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <div className="app-router">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" component={DashboardPage} exact={true} />
          <Route path="/posts/:id" component={ReadPostPage} />
          <PrivateRoute path="/create" component={CreatePost} />
          <PrivateRoute path="/edit/:id" component={EditPostPage} />
          <Route path="/users/:id" component={ViewUserProfilePage} />
          <PrivateRoute
            path="/account"
            component={ViewUserProfilePage}
            exact={true}
          />
          <PrivateRoute path="/account/edit" component={EditAccountPage} />
          <Route path="/signup" component={CreateAccountPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/playground" component={Playground} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export { AppRouter as default };
