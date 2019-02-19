import React, { Component } from "react";
import { navigate } from "@reach/router";
import { fetchUserByUsername } from "../api";

export class Auth extends Component {
  state = {
    userText: "",
    userErr: ""
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({
      userText: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { setUser } = this.props;
    const { userText } = this.state;
    fetchUserByUsername(userText)
      .then(({ user }) => {
        setUser(user);
        navigate("/");
      })
      .catch(err => {
        this.setState({
          userErr: err
        });
      });
  };

  render() {
    const { user, children } = this.props;
    const { userErr } = this.state;
    if (user) return children;
    else
      return (
        <div className="App-body">
          <p className="loginAlert">Please log in!</p>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="username"
              onChange={this.handleChange}
              required
            />
            <p>
              <button id="submit" type="submit">
                Login
              </button>
            </p>
            {userErr && (
              <p id="incorrect-user">Incorrect username! Please try again.</p>
            )}
          </form>
        </div>
      );
  }
}

export default Auth;
