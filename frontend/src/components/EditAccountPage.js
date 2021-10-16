import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AccountForm from "./AccountForm";
import UserContext from "../context/user-context";
import { startUpdateUser } from "../actions/user";

const EditAccountPage = ({ history }) => {
  const { user, userDispatch } = useContext(UserContext);

  const handleSubmit = async ({ password, ...updates }, isPublic) => {
    const action = await startUpdateUser(user._id, updates, password);

    if (action instanceof Error)
      return toast("Unable to save account, please check your password");

    userDispatch(action);
    history.push("/account");
  };

  return (
    <div className="content">
      <ToastContainer
        hideProgressBar
        toastClassName="toast toast--alert"
        position="top-center"
      />
      <div className="content-container">
        <h2>Edit account information</h2>
        <AccountForm handleSubmit={handleSubmit} user={user} />
      </div>
    </div>
  );
};

export default withRouter(EditAccountPage);
