import React from "react";
import { withRouter } from "react-router-dom";
import PasswordValidator from "./PasswordValidator";

class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: this.props.user ? this.props.user.username : null,
        firstName: {
          value: this.props.user ? this.props.user.firstName.value : null,
          isPublic: this.props.user ? this.props.user.firstName.isPublic : true
        },
        lastName: {
          value: this.props.user ? this.props.user.lastName.value : null,
          isPublic: this.props.user ? this.props.user.lastName.isPublic : true
        },
        email: {
          value: this.props.user ? this.props.user.email.value : null,
          isPublic: this.props.user ? this.props.user.email.isPublic : true
        },
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
    if (
      this.props.location.pathname === "/signup" &&
      !this.state.passwordsMatch
    ) {
      return console.log("Passwords doesn't match");
    } else {
      console.log("passed", this.state.user);
      this.props.handleSubmit(this.state.user);
    }
  };

  passwordsMatch = match => {
    if (match)
      this.setState(() => ({
        passwordsMatch: true
      }));
    else
      this.setState(() => ({
        passwordsMatch: false
      }));
  };

  render() {
    return (
      <>
        {this.state.error && (
          <p className="message__error">{this.state.error}</p>
        )}
        {this.props.error && (
          <p className="message__error">{this.props.error}</p>
        )}
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
            defaultValue={this.state.user.email.value}
            required
            onChange={e => {
              const email = e.target.value;
              this.setState(state => ({
                user: {
                  ...state.user,
                  email: { ...state.user.email, value: email }
                }
              }));
            }}
          />
          <div className="input-group--vertical">
            <input
              className="input input__name"
              type="text"
              placeholder="Forename"
              defaultValue={this.state.user.firstName.value}
              onChange={e => {
                const firstName = e.target.value;
                this.setState(state => ({
                  user: {
                    ...state.user,
                    firstName: { ...state.user.firstName, value: firstName }
                  }
                }));
              }}
            />
            <input
              className="input input__name"
              type="text"
              placeholder="Surname"
              defaultValue={this.state.user.lastName.value}
              onChange={e => {
                const lastName = e.target.value;
                this.setState(state => ({
                  user: {
                    ...state.user,
                    lastName: { ...state.user.lastName, value: lastName }
                  }
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
          <div className="form__checkboxes">
            <legend className="legend">Public information</legend>
            <label>
              <input
                className="checkbox"
                type="checkbox"
                defaultChecked={this.state.user.email.isPublic}
                onChange={e => {
                  const email = e.target.checked;
                  this.setState(state => ({
                    user: {
                      ...state.user,
                      email: { value: state.user.email.value, isPublic: email }
                    }
                  }));
                }}
              />
              <span className="label">Email</span>
            </label>
            <label>
              <input
                className="checkbox"
                type="checkbox"
                defaultChecked={this.state.user.firstName.isPublic}
                onChange={e => {
                  const firstName = e.target.checked;
                  this.setState(state => ({
                    user: {
                      ...state.user,
                      firstName: {
                        value: state.user.firstName.value,
                        isPublic: firstName
                      }
                    }
                  }));
                }}
              />
              <span className="label">Forename</span>
            </label>
            <label>
              <input
                className="checkbox"
                type="checkbox"
                defaultChecked={this.state.user.lastName.isPublic}
                onChange={e => {
                  const lastName = e.target.checked;
                  this.setState(state => ({
                    user: {
                      ...state.user,
                      lastName: {
                        value: state.user.lastName.value,
                        isPublic: lastName
                      }
                    }
                  }));
                }}
              />
              <span className="label">Surname</span>
            </label>
          </div>
          {this.props.user ? (
            <legend className="legend">
              Password needed to confirm changes:
            </legend>
          ) : (
            <div>
              <PasswordValidator
                password={this.state.user.password}
                repeatedPassword={this.state.repeatedPassword}
                passwordsMatch={this.passwordsMatch}
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
