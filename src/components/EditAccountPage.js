import React, { useContext } from "react";
import AccountForm from "./AccountForm";
import UserContext from "../context/user-context";

const EditAccountPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="content">
      <div className="content-container">
        <h2>Edit account information</h2>
        <AccountForm
          handleSubmit={() => console.log("submitting...")}
          user={user}
        />
      </div>
    </div>
  );
};

export default EditAccountPage;
