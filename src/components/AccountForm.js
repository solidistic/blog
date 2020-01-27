import React from "react";

class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      repeatedPassword: null,
      error: null
    };
  }

  confirmPassword = () => this.state.password === this.state.repeatedPassword;

  handleSubmit = e => {
    e.preventDefault();
    if (!this.confirmPassword()) return console.log("Passwords doesn't match");
    this.props.handleSubmit(this.state);
  };

  render() {
    return (
      <>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="* Username"
            required
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            className="input"
            type="text"
            placeholder="First Name"
            onChange={e => this.setState({ firstName: e.target.value })}
          />
          <input
            className="input"
            type="text"
            placeholder="Last Name"
            onChange={e => this.setState({ lastName: e.target.value })}
          />
          <input
            className="input"
            type="text"
            placeholder="* Email"
            required
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            className="input"
            type="password"
            placeholder="* Password"
            required
            minLength="6"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <input
            className="input"
            type="password"
            placeholder="* Repeat Password"
            required
            minLength="6"
            onChange={e => this.setState({ repeatedPassword: e.target.value })}
          />
          <button className="button">Save account</button>
        </form>
      </>
    );
  }
}

export default AccountForm;
