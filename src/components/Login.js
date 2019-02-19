import React, { Component } from "react";
import { fetchUserByUsername } from "../api";
import { navigate } from "@reach/router";

export class Login extends Component {
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
    const { userErr } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={this.handleChange}
          required
        />
        <button id="submit" type="submit">
          Login
        </button>
        {userErr && (
          <p id="incorrect-user">Incorrect username! Please try again.</p>
        )}
      </form>
    );
  }
}

export default Login;
