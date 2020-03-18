import React, { useState, useContext } from "react";
import AccountForm from "./AccountForm";
import api from "../api";
import { getErrorMessage } from "../utils/getErrorMessage";
import { startLogin } from "../actions/user";
import { addPost } from "../actions/posts";
import UserContext from "../context/user-context";
import PostContext from "../context/posts-context";

const CreateAccount = ({ history }) => {
  const { userDispatch } = useContext(UserContext);
  const { dispatch } = useContext(PostContext);
  const [error, setError] = useState(null);

  const createAccount = async (user, isPublic) => {
    console.log("CREATE ACCOUNT", user);
    const res = await api.createUser(user, isPublic);

    console.log(res);

    if (res && res.status === 201) {
      const [action, privatePosts] = await startLogin();
      console.log(action);
      await userDispatch(action);
      if (privatePosts.length > 0) {
        privatePosts.forEach(post => {
          dispatch(addPost(post));
        });
      }
      history.push("/");
    } else {
      setError(getErrorMessage(res));
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
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
