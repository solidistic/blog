import React from "react";
import { withRouter } from "react-router-dom";
import PasswordValidator from "./PasswordValidator";

class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: this.props.user ? this.props.user.username : null,
        firstName: this.props.user ? this.props.user.firstName : null,
        lastName: this.props.user ? this.props.user.lastName : null,
        email: this.props.user ? this.props.user.email : null,
        description: this.props.user ? this.props.user.description : null,
        password: null
      },
      repeatedPassword: null,
      passwordsMatch: false,
      error: null,
      disableInput: this.props.user ? true : false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props.location.pathname === "/signup");
    console.log(this.state.user.password === this.state.repeatedPassword);
    if (
      this.props.location.pathname === "/signup" &&
      !this.state.passwordsMatch
    ) {
      return console.log("Passwords doesn't match");
    } else {
      console.log("passed");
      // this.props.handleSubmit(this.state.user);
    }
  };

  showPasswordMessage = () => {
    return <div>LOL!</div>;
  };

  // check if given password matches twice
  // componentDidUpdate(prevProps, prevState) {
  //   console.log("updated");
  //   if (
  //     this.state.repeatedPassword === this.state.user.password &&
  //     this.state.repeatedPassword !== prevState.repeatedPassword
  //   ) {
  //     console.log("match");
  //     // passwords match
  //     this.setState(() => ({
  //       passwordsMatch: true
  //     }));
  //   } else if (
  //     this.state.repeatedPassword !== this.state.user.password &&
  //     this.state.repeatedPassword !== prevState.repeatedPassword
  //   ) {
  //     console.log("no match");
  //     // passwords doesn't match
  //     this.setState(() => ({
  //       passwordsMatch: false
  //     }));
  //   }
  // }

  render() {
    return (
      <>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="* Username"
            defaultValue={this.state.user.username}
            disabled={this.state.disableInput}
            required
            autoFocus
            minLength="3"
            onChange={e => {
              const username = e.target.value;
              this.setState(state => ({
                user: { ...state.user, username }
              }));
            }}
          />
          <input
            className="input"
            type="text"
            placeholder="* Email"
            defaultValue={this.state.user.email}
            required
            onChange={e => {
              const email = e.target.value;
              this.setState(state => ({
                user: { ...state.user, email }
              }));
            }}
          />
          <div className="input-group--vertical">
            <input
              className="input input__name"
              type="text"
              placeholder="First Name"
              defaultValue={this.state.user.firstName}
              onChange={e => {
                const firstName = e.target.value;
                this.setState(state => ({
                  user: { ...state.user, firstName }
                }));
              }}
            />
            <input
              className="input input__name"
              type="text"
              placeholder="Last Name"
              defaultValue={this.state.user.lastName}
              onChange={e => {
                const lastName = e.target.value;
                this.setState(state => ({
                  user: { ...state.user, lastName }
                }));
              }}
            />
          </div>
          <textarea
            className="input textarea"
            type="text"
            placeholder="Describe yourself (max. 200 characters)"
            defaultValue={this.state.user.description}
            maxLength="200"
            onChange={e => {
              const description = e.target.value;
              this.setState(state => ({
                user: { ...state.user, description }
              }));
            }}
          />
          {this.props.user ? (
            <legend className="legend">
              Password needed to confirm changes:
            </legend>
          ) : (
            <div>
              <PasswordValidator
                password={this.state.user.password}
                repeatedPassword={this.state.repeatedPassword}
              />
            </div>
          )}
          <input
            className="input"
            type="password"
            placeholder="* Password"
            required
            minLength="6"
            onChange={e => {
              const password = e.target.value;
              this.setState(state => ({
                user: { ...state.user, password }
              }));
            }}
          />
          {!this.props.user && (
            <input
              className="input"
              type="password"
              placeholder="* Repeat Password"
              required
              minLength="6"
              onChange={e =>
                this.setState({ repeatedPassword: e.target.value })
              }
            />
          )}
          <button className="button">
            {this.props.user ? "Save account" : "Create account"}
          </button>
        </form>
      </>
    );
  }
}

export default withRouter(AccountForm);
