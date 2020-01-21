import React, { useState, useEffect } from "react";
import Header from "./Header";
import api from "../api";
import Post from "./Post";

const ViewUserProfilePage = ({ match }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await api.getUserById(match.params.id);
      setUser(data);
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
          <div>
            Latest activity:{" "}
            {user.posts.map(post => (
              <div key={post._id}>
                <Post post={post} author={user.username} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
};

export default ViewUserProfilePage;
