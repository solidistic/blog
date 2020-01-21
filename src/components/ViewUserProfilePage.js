import React, { useState, useEffect } from "react";
import Header from "./Header";
import api from "../api";

const ViewUserProfilePage = ({ match }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data: userData } = await api.getUserById(match.params.id);
      console.log(userData);
      setUser(userData);
    };
    loadUser();
  }, [match.params.id]);

  return (
    <div>
      <Header />
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>
            Posts:{" "}
            {user.posts.map(post => (
              <div>Another post</div>
            ))}
          </p>
        </div>
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
};

export default ViewUserProfilePage;
