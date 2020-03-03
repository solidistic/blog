import React from "react";
import AccountForm from "./AccountForm";
import api from "../api";

const CreateAccount = ({ history }) => {
  const createAccount = async (user, isPublic) => {
    console.log("CREATE ACCOUNT", user);
    const res = await api.createUser(user, isPublic);
    console.log(res);
    if (res.status === 201) history.push("/");
  };

  return (
    <div className="content">
      <div className="content-container">
        <h2 className="content-container__title">Create a new account</h2>
        <p className="content-container__subtitle--secondary">
          Fields with * are required
        </p>
        <AccountForm
          history={history}
          handleSubmit={createAccount}
        />
      </div>
    </div>
  );
};

export default CreateAccount;
