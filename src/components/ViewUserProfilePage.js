import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Post from "./Post";
import UserContext from "../context/user-context";
import PostsContext from "../context/posts-context";
import { logout, startRemoveUser } from "../actions/user";
import { removeAllFromUser } from "../actions/posts";
import LoadingPage from "./LoadingPage";

// class ViewUserProfilePage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: null,
//       isLoaded: false
//     };
//   }

//   handleRemoveUser = async () => {
//     const { userDispatch } = this.context;
//     console.log(this.props);
//     try {
//       // const id = await startRemoveUser();
//       // console.log("REMOVED USER ID", id);
//       // await dispatch(removeAllFromUser(id));
//       // userDispatch(logout());
//       // this.props.history.push("/");
//     } catch (e) {
//       console.log("Unable to safely remove account:", e);
//     }
//   };

//   componentDidMount() {
//     const { user } = this.context;
//     let id;

//     if (this.props.history.location.pathname === "/account" && user.user) {
//       id = user.user._id;
//     } else {
//       id = this.props.match.params.id;
//     }

//     const fetchUser = async () => {
//       try {
//         const { data: user } = await api.getUserById(id);
//         this.setState(() => ({ user, isLoaded: true }));
//       } catch (e) {
//         console.error("ERROR FETCHING USER:", e);
//       }
//     };
//     fetchUser();
//   }

//   componentDidUpdate() {
//     console.log("UPDATED", this.state, this.context);
//   }

//   render() {
//     const { user: contextUser } = this.context;
//     if (contextUser && this.state.user) {
//       console.log(contextUser.user._id);
//       console.log("STATE USER", this.state.user);
//       console.log(contextUser.user._id === this.state.user._id);
//     }
//     if (this.isLoaded === false) {
//       return <div>Loading...</div>;
//     } else {
//       return (
//         <div className="content-container">
//           {this.state.user ? (
//             <div>
//               <p className="content-container__subtitle">
//                 Username: {this.state.user.username}
//               </p>
//               <p className="content-container__subtitle">
//                 Email: {this.state.user.email}
//               </p>
//               {contextUser.user._id === this.state.user._id && (
//                 <button
//                   className="button button--delete"
//                   onClick={this.handleRemoveUser}
//                 >
//                   Delete account
//                 </button>
//               )}
//               <div>
//                 Latest activity:{" "}
//                 {this.state.user.posts.map(post => (
//                   <div key={post._id}>
//                     <Post post={post} author={this.state.user.username} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div>User not found</div>
//           )}
//         </div>
//       );
//     }
//   }
// }

// ViewUserProfilePage.contextType = UserContext;

//! Jos päivittää suoraan /accounts/me niin failaa, koska renderöi ennen
//! datan hakua..

const ViewUserProfilePage = ({ history, match }) => {
  const { dispatch } = useContext(PostsContext);
  const { user: loggedUser, userDispatch } = useContext(UserContext);
  const [user, setCurrentUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const id =
      history.location.pathname === "/account" && loggedUser.user._id
        ? loggedUser.user._id
        : match.params.id;
        
    const loadUser = async () => {
      const res = await api.getUserById(id);
      console.log(res);
      if (res.status !== 200) {
        console.log("ERROR", error);
        setError(true);
        return setIsLoaded(true);
      }
      setCurrentUser(res.data);
      setIsLoaded(true);

      console.log("USER", user, isLoaded);
    };

    if (!isLoaded) loadUser();
  }, [match.params.id, loggedUser, history, user, isLoaded, error]);

  const handleRemoveUser = async () => {
    try {
      const id = await startRemoveUser();
      console.log("REMOVED USER ID", id);
      await dispatch(removeAllFromUser(id));
      userDispatch(logout());
      history.push("/");
    } catch (e) {
      console.log("Unable to safely remove account:", e);
    }
  };

  if (!isLoaded) return <LoadingPage />
  return (
    <div className="content">
      <div className="content-container">
        {!error ? (
          <div>
            <div className="content-container__information">
              <h3 className="content-container__subtitle">
                Account information
              </h3>
              <p>
                <span className="content-container__subtitle--secondary">
                  Username:
                </span>{" "}
                {user.username}
              </p>
              <p>
                <span className="content-container__subtitle--secondary">
                  First name:
                </span>{" "}
                {user.firstName}
              </p>
              <p>
                <span className="content-container__subtitle--secondary">
                  Last name:
                </span>{" "}
                {user.lastName}
              </p>
              <p>
                <span className="content-container__subtitle--secondary">
                  Email:
                </span>{" "}
                {user.email}
              </p>
              {loggedUser.user._id === user._id && (
                <div>
                  <Link className="button" to="/accout/edit">
                    Change information
                  </Link>
                  <button
                    className="button button--delete"
                    onClick={handleRemoveUser}
                  >
                    Delete account
                  </button>
                </div>
              )}
            </div>
            <div>
              <h2 className="content-container__title">Latest activity:</h2>
              {user.posts.map(post => (
                <div className="list-item" key={post._id}>
                  <Post post={post} author={user.username} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>User not found</div>
        )}
      </div>
    </div>
  );
};

export default ViewUserProfilePage;
