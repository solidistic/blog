import React, { useContext } from "react";
import AccountForm from "./AccountForm";
import UserContext from "../context/user-context";

const EditAccountPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>Edit account information</h2>
      <AccountForm
        handleSubmit={() => console.log("submitting...")}
        user={user}
      />
    </div>
  );
};

export default EditAccountPage;
