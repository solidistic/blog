import React, { useState } from "react";
import AccountForm from "./AccountForm";
import api from "../api";
import { getErrorMessage } from "../utils/getErrorMessage";

const CreateAccount = ({ history }) => {
  const [error, setError] = useState(null);

  const createAccount = async (user, isPublic) => {
    console.log("CREATE ACCOUNT", user);
    const res = await api.createUser(user, isPublic);
    
    if (res.status === 201) return history.push("/");

    setError(getErrorMessage(res));
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
          error={error}
        />
      </div>
    </div>
  );
};

export default CreateAccount;
