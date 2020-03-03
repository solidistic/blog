import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import AccountForm from "./AccountForm";
import UserContext from "../context/user-context";
import { startUpdateUser } from "../actions/user";

const EditAccountPage = ({ history }) => {
  const { user, userDispatch } = useContext(UserContext);
  const [error, setError] = useState("");

  const handleSubmit = async ({ password, ...updates }, isPublic) => {
    const action = await startUpdateUser(user._id, updates, password);

    if (action instanceof Error)
      return setError("Unable to save account, please check your password");

    userDispatch(action);
    history.push("/account");
  };

  return (
    <div className="content">
      <div className="content-container">
        <h2>Edit account information</h2>
        {error && <p id="error-message">{error}</p>}
        <AccountForm handleSubmit={handleSubmit} user={user} />
      </div>
    </div>
  );
};

export default withRouter(EditAccountPage);
