import React, { useContext } from "react";
import PostsList from "./PostsList";
import UserContext from "../context/user-context";

function DashboardPage() {
  const { user } = useContext(UserContext);
  return (
    <div className="content">
      <div className="content-container">
        {user && <h1>Welcome, {user.user.username}!</h1>}
        <h2 className="content-container__title">This is your blog</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
          cupiditate? Sapiente ut, deserunt ex consequuntur ea hic quo, minima
          odio voluptate magnam odit earum dolor dolorem delectus minus
          pariatur? Unde provident, quo maxime veniam non quisquam assumenda
          impedit earum sint aliquam numquam nisi totam eius illo? Incidunt
          repudiandae sint animi non voluptas, provident, sunt eos nostrum quis
          nulla velit. Ut non dicta totam unde at, beatae repellendus adipisci
          itaque, tempora provident excepturi doloremque consequuntur sequi
          laudantium laborum perspiciatis. Libero autem magni ipsa molestias cum
          blanditiis, adipisci cumque veniam! Error necessitatibus voluptatibus
          dolor saepe dignissimos voluptatem culpa maxime sunt nulla quam.
        </p>
      </div>
      <div className="content-container">
        <PostsList />
      </div>
    </div>
  );
}

export default DashboardPage;
