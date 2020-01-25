import React, { useState, useEffect, useContext } from "react";
import api from "../api";
import Post from "./Post";
import UserContext from "../context/user-context";

// class ViewUserProfilePage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.user = this.context;
//   }

//   componentWillMount() {
//     console.log(this.context);
//     const { loggedUser } = this.context;
//     console.log("logged user", loggedUser);
//     const id =
//       this.props.history.location.pathname === "/users/me"
//         ? loggedUser.user._id
//         : this.props.match.params.id;
//     const loadUser = async () => {
//       const { data } = await api.getUserById(id);
//       this.setState(state => ({ user: data }));
//     };
//     loadUser();
//   }

//   render() {
//     return (
//       <div>
//         {this.user ? (
//           <div>
//             <p>Username: {this.user.username}</p>
//             <p>Email: {this.user.email}</p>
//             <div>
//               Latest activity:{" "}
//               {this.user.posts.map(post => (
//                 <div key={post._id}>
//                   <Post post={post} author={this.user.username} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div>User not found</div>
//         )}
//       </div>
//     );
//   }
// }

// ViewUserProfilePage.contextType = UserContext;

//! Jos päivittää suoraan /accounts/me niin failaa, koska renderöi ennen
//! datan hakua..

const ViewUserProfilePage = ({ history, match }) => {
  const { user: loggedUser } = useContext(UserContext);
  const [user, setCurrentUser] = useState(null);

  useEffect(() => {
    const id =
      history.location.pathname === "/users/me"
        ? loggedUser.user._id
        : match.params.id;
    const loadUser = async () => {
      const { data } = await api.getUserById(id);
      setCurrentUser(data);
    };
    loadUser();
  }, [match.params.id, loggedUser, history]);

  return (
    <div className="content-container">
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
