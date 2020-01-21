import React, { useContext } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import UserContext from "../context/user-context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      component={props => {
        // console.log(props);
        return user ? (
          <div>
            <p>You are logged in and viewing private page</p>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default withRouter(PrivateRoute);
